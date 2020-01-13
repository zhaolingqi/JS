function myCall(context = window) {
    context.fn = this
    let args = [...arguments].slice(1)
    let res = context.fn(...args)
    delete context.fn
    return res
}
/**
 * 
 * @param {Object} context 
 * @param {Array} args 
 */
function myApply(context = window, args) {
    context.fn = this
    let res
    if (!args) {
        res = context.fn()
    } else {
        res = context.fn(...args)
    }
    delete context.fn
    return res
}


function myBind(context) {
    let args = [...arguments].slice(1)
    let fn = this
    let FNOP = function () { }
    let F = function () {
        let newArgs = (args.concat([...arguments]))
        return fn.apply(this instanceof F ? this : context, newArgs)
    }
    FNOP.prototype = this.prototype
    F.prototype = new FNOP()
    return F
}

// 防抖
function debounce(fn, delay) {
    let timeout = null
    return function () {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            fn.call(this, arguments)
        }, delay)
    }
}
// 防抖 考虑立即执行
function debounce2(fn, delay, immediate) {
    let timeout = null
    return function () {
        if (immediate) {
            let callNow = !timeout
            timeout = setTimeout(() => {
                timeout = null
            }, delay)
            if (callNow) fn.apply(this, arguments)
        } else {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                fn.apply(this, argument)
            }, delay)
        }
    }
}

// 节流 用时间戳实现
function throttle1(fn, delay) {
    let pre = 0
    return function () {
        let context = this
        let now = +new Date()
        if (now - pre > delay) {
            fn.apply(context, arguments)
            pre = now
        }
    }
}

// 节流 用定时器实现 触发事件的时候，我们设置一个定时器，再触发事件的时候，如果定时器存在，就不执行，直到定时器执行，然后执行函数，清空定时器，这样就可以设置下个定时器。
function throttle2(fn, delay) {
    let tiomeout = null
    return function () {
        let context = this
        if(!timeout) {
            timeout = setTimeout(() => {
                fn.apply(context, arguments)
                timeout = null
            }, delay)
        }
    }
}

function mixArgs(first, second = "f") {
    console.log(first === arguments[0])     //true
    console.log(second === arguments[1])   //true
    first = "c" , 
    second = "d"
    console.log(first === arguments[0])   //true
    console.log(second === arguments[1])   //true
}
// mixArgs("a")

// var person = {
//     a : 1,
//     get b() {return this.a + 1},
//     set name(n) {this.a = n}
// }
// console.log(person.b)
// console.log(person.b)
// console.log(person.b)
// let lastName = "last name"
// let person = {
//     "first name" : "Ni",
//     [lastName] : 'ZS'
// }
// console.log(person["last name"])

// var receiver = {},
//     supplier = {
//         get name(){
//             return "file.js"
//         }
//     }

// Object.assign(receiver, supplier)
// console.log(receiver)

// let person = {
//     getGreeting() {
//         return "Hello"
//     }
// }
// let dog = {
//     getFreeting() {
//         return "Woof"
//     }
// }
// let friend = Object.create(person)
// console.log(friend.__proto__)
// console.log(Object.getPrototypeOf(friend))

// let node = {
//     type: "function",
//     name: "foo"
// }
// // let {name, type} = node
// type = "123"
// name = 777
// ({type, name}) = node

// console.log(type)

// let colors = ["a","b","c","d","e"],first = "z",sec = "fg";
// [first,sec] = colors
// console.log(first)

// let values = [2,3,4,5]
// let iterator = values[Symbol.iterator]()

// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())

let myObject = {
    items:[],
    [Symbol.iterator]: function *(item) {
        for(let item of this.items) {
            yield item
        }
    } 
    // *[Symbol.iterator]() {

    // }
}

myObject.items.push(1,2,3,4)
for(let x of myObject) {
    console.log(x)
}