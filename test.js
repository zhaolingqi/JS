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
        if (!timeout) {
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
    first = "c",
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

// let myObject = {
//     items:[],
//     [Symbol.iterator]: function *(item) {
//         for(let item of this.items) {
//             yield item
//         }
//     } 
//     // *[Symbol.iterator]() {

//     // }
// }

// myObject.items.push(1,2,3,4)
// for(let x of myObject) {
//     console.log(x)
// }
// class Person {
//     constructor(name) {
//         this.name = name
//     }

//     sayName() {
//         console.log(this.name)
//     }
// }

// let p = new Person('hahha')
// console.log(typeof p, typeof Person, Person.prototype.sayName)
// console.log(Object.getOwnPropertyDescriptor(Person, "prototype"))
// Object.defineProperty(Person, "prototype1", {
//     enumerable: true
// })
// console.log(Object.getOwnPropertyDescriptor(Person, "prototype1"))
// console.log(Array.prototype.map)


// class MyArray extends Array {

//     static get [Symbol.species] () {
//         return Array;
//     }
// }
// const a = new MyArray(1,2,3);
// const b = a.map(x => x);
// const c = a.filter(x => x > 1);
// console.log(a, b);
// console.log(c);
// console.log(b instanceof MyArray); //true

// let thenable = {
//     then: function(resolve, reject) {
//         resolve(11)
//     }
// }
// let p1 = Promise.resolve(thenable)
// p1.then((value)=>{
//     console.log(value)
// })

let fs = require("fs")
function readFile(filename) {
    return new Promise((resolve, reject) => {
        // 触发异步操作
        fs.readFile(filename, { encoding: "utf-8" }, (err, contents) => {
            if (err) {
                reject(err)
                return;
            }
            resolve(contents)
        })
    })
}
let promise = readFile("example.txt")

// 同时监听执行完成和执行被拒
// promise.then((value) => {
//     // 执行完成
//     console.log(value)
// }, (err) => {
//     //拒绝
//     console.log(err)
// })

// 同时监听执行完成和执行被拒
// promise.then((value) => {
//     // 执行完成
//     console.log(value)
// }).catch((err) => {
//     console.log(err)
// })

// const p1 = new Promise(function (resolve, reject) {
//     setTimeout(() => reject(new Error('fail')), 3000)
// })

// const p2 = new Promise(function (resolve, reject) {
//     setTimeout(() => resolve(p1), 1000)
// })

// p2.then(result => console.log(result))
//     .catch(error => console.log(error))

// let pro = new Promise((resolve, reject) => {
//     throw new Error("EEEEEE")
// })
// pro.catch(err => console.log(err))

// let p1 = new Promise(function(resolve, reject) {
//     resolve(42)
// })

// let rejected

// process.on("unhandledRejection", function(reason, promise) {
//     console.log(reason)
//     console.log(promise === rejected)
// })

// rejected = Promise.reject(new Error("EEEEE"))

// let rejected

// process.on("rejectedHandled", function(promise) {
//     // console.log(reason)
//     console.log(promise === rejected)
// })

// rejected = Promise.reject(new Error("EEEEE"))

// setTimeout(() => {
//     rejected.catch(function(val) {
//         // console.log(val.message)
//     })
// }, 1000)

// let p1 = new Promise((resolve, reject) => {
//     resolve(42)
// })

// p1.then(value => console.log(value))
//     .then(() => console.log('Finished'))

// let p1 = new Promise((resolve, reject) => {
//     resolve(42)
// })

// p1.then(value => {throw new Error("Boom!")})
//     .then(() => console.log('aaa'))
//     .catch((err) => console.log(err.message))

// let p1 = new Promise((resolve, reject) => {
//     resolve(42)
// })

// let p2 = new Promise((resolve, reject) => {
//     resolve(44)
// })

// p1.then(value => {
//   	console.log(value)  //42
//     return p2  
// }).then((value) => {
//     console.log(value)  //44
// })

// let p1 = new Promise((resolve, reject) => {

//     setTimeout(() => {
//         resolve(42)
//     }, 1000)
// })

// let p2 = new Promise((resolve, reject) => {

//     setTimeout(() => {
//         reject(44)
//     }, 2000)
// })

// let p3 = new Promise((resolve, reject) => {

//     setTimeout(() => {
//         resolve(45)
//     }, 4000)
// })

// let p4 = Promise.all([p1, p2, p3])
// let pre = +new Date()
// p4.then((value) => {
//     console.log(+new Date() - pre)
//     console.log(value)
// }).catch((err) => {
//     console.log(+new Date() - pre)
//     console.log(err)
// })

// async function f() {    // await 只能在async函数中使用
//     let promise = new Promise((resolve, reject) => {
//         setTimeout(() => resolve('done!'), 1000)
//     })
//     let result = await promise   //  直到promise返回一个resolve值（*）才会执行下一句
//     console.log('1234')
//     console.log(result) // 'done!' 
// }
// f()
// function getSomething() {
//     return "something";
// }
// async function testAsync() {
//     return Promise.resolve("hello async");
// }
// const xxx = {a:1,b:2}
// async function test() {
//     const v1 = await getSomething();   // await 后跟普通函数的返回值
//     const v2 = await testAsync();     // await 后跟异步函数的返回值
//     const v3 = await  xxx
//     console.log(v1, v2,v3);
// }
// test();

function Person(name) {
    this.name = name
    console.log('111')
}
Person.prototype.age = 18

function Per(name) {
    Person.call(this, name)
}

let pro = Object.create(Person.prototype)
pro.constructor = Per
Per.prototype = pro

let a = new Per(12)
console.log(a.age)


// console.log('script start');

// setTimeout(function() {

//     console.log('setTimeout');

// }, 0);

// Promise.resolve().then(function() {    

// console.log('promise1');

// }).then(function() {    

// console.log('promise2');
// });

// console.log('script end');

var Base = function () {
    this.a = 2
}
Base.prototype.a = 3;
var o1 = new Base();
var o2 = Object.create(Base);
console.log(o1.a);
console.log(o2.prototype, o1);