/* *
 * 自定义Promise函数模块
 * Promise三种状态
 * 
 * pending
 * fulfilled
 * rejected
 */

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'


function Promise(executor) {
    let self = this
    self.status = PENDING // 初始状态
    self.value = undefined // 给promise调用完成后的终值
    self.reason = undefined // promise调用失败据因
    self.onFulfilledCallBacks = [] // 存储fulfilled状态对应的onFulfilled函数
    self.onRejectedCallBacks = [] // 存储rejected状态对应的onRejected函数
    /**
    * Promise对象的resolve方法
    * 返回一个指定结果的成功的promise
    */
    function resolve(value) {
        // 如果传入的value也是一个Promise
        if (value instanceof Promise) return value.then(resolve, reject)
        setTimeout(() => {
            if (self.status === PENDING) {
                self.status = FULFILLED
                self.value = value
                //如果有待执行的fulfilled回调函数，则异步执行它
                self.onFulfilledCallBacks.forEach(fn => {
                    fn(value)
                })
            }
        })
    }
    /**
     * reject
     * 返回一个指定reason的失败的promise
     */
    function reject(reason) {
        setTimeout(() => {
            if (self.status === PENDING) {
                self.status = REJECTED
                self.reason = reason
                self.onRejectedCallBacks.forEach(fn => {
                    fn(reason)
                })
            }
        })
    }

    // 立即同步执行executor
    try {
        executor(resolve, reject)
    } catch (e) {
        reject(e)
    }

}


/**
 * Promise解决过程
 * 对resolve进行改造增强 针对resolve中不同值情况进行处理
 * @param {promise} promise promise1.then方法返回的新的promise对象
 * @param {[type]} x  promise1中onFulfilled的返回值
 * @param {[type]} resolve  promise2的resolve方法
 * @param {[type]} reject  promise2的reject方法
 * 
 * 1. x与promise 相等
 *      以 typeError为据因拒绝执行promise
 * 2. x为Promise
 *      使promise2 接受x的状态：
 *          （1）x为pending。 promise2需保持等待态直至x被执行或拒绝
 *          （2）x 为fulfilled 用相同的值执行promise2
 *          （3）x为rejected 用相同的据因拒绝promise2
 * 3. x为对象或者函数
 *      把x.then 赋值给then
 *          如果取x.then时抛出错误e, 则以e为据因拒绝promise2
 *          如果then是函数，将x作为函数作用域this调用之。传递两个回调函数作为参数，第一个参数叫resolvePromise ，第二个参数叫做 rejectPromise:
 *          如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
 *          如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
 *          如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
 *          如果调用 then 方法抛出了异常 e：
 *          如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
 *          否则以 e 为据因拒绝 promise
 *          如果 then 不是函数，以 x 为参数执行 promise
 *          如果 x 不为对象或者函数，以 x 为参数执行 promise
 * 
 * 如果一个 promise 被一个循环的 thenable 链中的对象解决，而 [[Resolve]](promise, thenable) 
 * 的递归性质又使得其被再次调用，根据上述的算法将会陷入无限递归之中。算法虽不强制要求，
 * 但也鼓励施者检测这样的递归是否存在，若检测到存在则以一个可识别的 TypeError 为据因来拒绝 promise 注6。
 * 
 */
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        reject(new TypeError('Error'))
    }
    if (promise2 === x) {
        reject(new TypeError('Chaining cycle'));
    }
    let called = false
    if (x instanceof Promise) { // x为Promise
        if (x.status === PENDING) { //如果 x 处于等待态， promise 需保持为等待态直至 x 被执行或拒绝
            x.then((value) => {
                resolvePromise(promise2, value, resolve, reject)
            }, (reason) => {
                reject(reason)
            })
        } else { // 如果x 不处于pending。 则用相同的值或据因执行下去
            x.then(resolve, reject)
        }
    } else if (x && (typeof x === 'object' || typeof x === 'function')) { //x为对象或者函数
        try { // 取出x.then的值 即判断是否是thenable对象
            let then = x.then
            if (typeof then === 'function') { //如果 then 是函数，将 x 作为函数的作用域 this 调用之。
                //传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做rejectPromise
                then.call(x, (y) => {
                    if (called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, (r) => {
                    if (called) return
                    called = true
                    reject(r)
                })
            } else { // 只是一个普通对象
                if (called) return
                called = true
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}



/**
 * Promise原型对象的then（）
 * 注册成功和失败的回调函数
 * 返回一个新的Promise对象
 * @param  {function} onFulfilled fulfilled状态时 执行的函数
 * @param  {function} onRejected  rejected状态时 执行的函数
 * @return {function} promise  返回一个新的promise对象
 */
/**
 * 如果onFulfilled 、 onRejected 不是函数，其必须被忽略
 * 
 * 如果onFulfilled是函数，
 * 当promise执行结束后其必须被调用，其第一个参数为promise的终值。
 * 在promise执行结束前，其不可被调用，
 * 其调用次数不可超过一次
 * 
 * 当promise被拒绝执行后onRejected必须被调用，其第一个参数为promise的据因
 * 在promise被拒绝执行前不可被调用
 * 其调用次数不可超过一次
 * 
 * then 方法必须返回一个 promise 对象
 * promise2 = promise1.then(onFulfilled, onRejected);
 * 如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的 Promise 解决过程(resolvePromise)：[[Resolve]](promise2, x)
 * 如果 onFulfilled 或者 onRejected 抛出一个异常 e ，则 promise2 必须拒绝执行，并返回拒因 e
 * 如果 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的值
 * 如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的据因
 */
Promise.prototype.then = function (onFulfilled, onRejected) {
    const self = this
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
    /**
     * then中的FULFILLED/REJECTED状态为什么要加setTimeout？
     * 要确保 onFulfilled 和 onRejected 方法异步执行(且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行) 
     * 所以要在resolve里加上setTimeout
     */

    if (self.status === FULFILLED) {
        return newPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onFulfilled(self.value)
                    resolvePromise(newPromise, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }

    if (self.status === REJECTED) {
        return newPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onRejected(self.reason)
                    resolvePromise(newPromise, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }
    if (self.status === PENDING) {  // 等待态
        // 将onFulfilled,onRejected放入成功和失败的回调函数onFulfilledCallBacks和onRejectedCallBacks中
        return newPromise = new Promise((resolve, reject) => {
            self.onFulfilledCallBacks.push((value) => {
                try {
                    let x = onFulfilled(value)
                    resolvePromise(newPromise, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
            self.onRejectedCallBacks.push((reason) => {
                try {
                    let x = onRejected(reason)
                    resolvePromise(newPromise, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }

}
/**
 * Promise原型对象的catch（）
 * 指定失败的回调函数
 * 返回一个新的Promise对象
 * 用于promise方法链时 捕获前面onFulfilled/onRejected抛出的异常
 */
Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
}

Promise.resolve = function (value) {
    return new Promise((resolve) => {
        resolve(value)
    })
}

Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason)
    })
}

/**
 * Promise.all Promise进行并行处理
 * 参数: promise对象组成的数组作为参数
 * 返回值: 返回一个Promise实例
 * 当这个数组里的所有promise对象全部变为resolve状态的时候，才会resolve。
 */
Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        let done = gen(promises.length, resolve)
        promises.forEach((promise, index) => {
            promise.then((value) => {
                done(index, value)
            }, reject)
        })
    })
}

function gen(length, resolve) {
    let count = 0;
    let values = [];
    return function (i, value) {
        values[i] = value;
        if (++count === length) {
            console.log(values);
            resolve(values);
        }
    }
}

/**
 * Promise.race
 * 参数: 接收 promise对象组成的数组作为参数
 * 返回值: 返回一个Promise实例
 * 只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理(取决于哪一个更快)
 */
Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        promises.forEach((promise, index) => {
            promise.then(resolve, reject);
        });
    });
}

/**
 * 基于Promise实现Deferred
 *  * Deferred和Promise的关系
 * - Deferred 拥有 Promise
 * - Deferred 具备对 Promise的状态进行操作的特权方法（resolve reject）
 */
Promise.defer = Promise.deferred = function () { // 延迟对象
    let defer = {};
    defer.promise = new Promise((resolve, reject) => {
        defer.resolve = resolve;
        defer.reject = reject;
    });
    return defer;
}

try {
    module.exports = Promise
} catch {

}