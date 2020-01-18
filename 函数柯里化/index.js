
// 初步封装

// var curry = function(fn) {
//     var args = [...arguments].slice(1)
//     return function() {
//         var newArguments = args.concat([...arguments])
//         return fn.apply(this, newArguments)
//     }
// }

// 加上递归调用， 只要参数个数小于最初的fn.length 或者设定的length长度 就会继续执行递归

function curry(fn, args) {
    let len = fn.length
    let context = this
    args = args || []
    return function() {
        let newArgs = args.concat([...arguments])
        console.log(newArgs)
        if(newArgs.length < len) {
            return curry.call(context, fn, newArgs)
        }
        return fn.apply(this, newArgs)
    }
}

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
   


var addCurry = curry(add,1);
console.log(addCurry(4)(5)) // 3
