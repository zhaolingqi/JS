
// 初步封装

// var curry = function(fn) {
//     var args = [...arguments].slice(1)
//     return function() {
//         var newArguments = args.concat([...arguments])
//         return fn.apply(this, newArguments)
//     }
// }

// 加上递归调用， 只要参数个数小于最初的fn.length 或者设定的length长度 就会继续执行递归

// function curry(fn, args) {
//     let len = fn.length
//     let context = this
//     args = args || []
//     console.log(args)
//     return function() {
//         let newArgs = args.concat([...arguments])
//         console.log(newArgs)
//         if(newArgs.length < len) {
//             return curry.call(context, fn, newArgs)
//         }
//         return fn.apply(this, newArgs)
//     }
// }

/**
 * 
 * @param {Function} fn 
 * @param {Number} length 
 */
// function curry(fn, length) {
//     let len = length || fn.length
//     let context = this
    
//     return function() {
//         if(arguments.length < len) {

//         }
//     }
// }


function add(a, b, c) {
    return a + b + c;
}

function sub_curry(fn) {
    var args = [].slice.call(arguments, 1);
    return function() {
        return fn.apply(this, args.concat([].slice.call(arguments)));
    };
}

function curry(fn, length) {

    length = length || fn.length;

    var slice = Array.prototype.slice;

    return function() {
        if (arguments.length < length) {
            var combined = [fn].concat(slice.call(arguments));
            return curry(sub_curry.apply(this, combined), length - arguments.length);
        } else {
            return fn.apply(this, arguments);
        }
    };
}

var addCurry = curry(add,1);
console.log(addCurry(4)(5)) // 3
