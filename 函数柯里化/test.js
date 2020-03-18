//经典面试,实现add(1, 2, 3, 4)=10,add(1)(2)(3)(4)(5)=15,add(1, 2, 3, 4)(5)(6)=21

// function add() {
//     let args = [...arguments]
//     let newAdd = function() {
//         Array.prototype.push.call(args, ...arguments)
//         return newAdd
//     }
//     newAdd.toString = function() {
//         return args.reduce((a, b) => {
//             return a + b
//         })
//     }
//     return newAdd
// }
// console.log(add(1)(2, 3)(6) == 12)

// function curry (fn, currArgs) {
//     return function() {
//         let args = [].slice.call(arguments);
//         // 首次调用时，若未提供最后一个参数currArgs，则不用进行args的拼接
//         if (currArgs !== undefined) {
//             args = args.concat(currArgs);
//         }
//         // 递归调用
//         if (args.length < fn.length) {
//             return curry(fn, args);
//         }
//         // 递归出口
//         return fn.apply(null, args);
//     }
// }
// const persons = [
//     { name: 'kevin', age: 4 },
//     { name: 'bob', age: 5 }
// ];

// // 这里的 curry 函数，之前已实现
// const getProp = curry(function (obj, index) {
//     console.log(arguments, obj)
//     const args = [].slice.call(arguments);
//     return obj[args[args.length - 1]];
// });

// const ages = persons.map(getProp('age')); // [4, 5]
// // const names = persons.map(getProp('name')); // ['kevin', 'bob']
// // console.log(ages, names)

function memoize(f) {
    var cache = {};
    return function(){
        var key = arguments.length + Array.prototype.join.call(arguments, ",");
        console.log(cache)
        if (key in cache) {
            return cache[key]
        }
        else {
            return cache[key] = f.apply(this, arguments)
        }
    }
}
var propValue = function(obj){
    return obj.value
}

var memoizedAdd = memoize(propValue)

console.log(memoizedAdd({value: 1})) // 1
console.log(memoizedAdd({value: 2})) // 1