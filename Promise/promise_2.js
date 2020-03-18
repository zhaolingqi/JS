
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
function Promise(executor) {
    this.state = PENDING,
    this.value = null,
    this.reason = null,
    this.onFulfilledCallBacks = [] // 存储fulfilled状态对应的onFulfilled函数
    this.onRejectedCallBacks = [] // 存储rejected状态对应的onRejected函数

    function resolve(value) {
        let that = this
        if(this.state === PENDING) {
            this.state = FULFILLED
            this.value = value
            this.onFulfilledCallBacks.forEach(fn => {
                fn.call(that)
            });
        }
    }
    function reject(reason) {
        let that = this
        if(this.state === PENDING) {
            this.state = FULFILLED
            this.reason = reason
            this.onRejectedCallBacks.forEach(fn => {
                fn.call(that)
            });
        }
    }

    try {
        executor(resolve, reject)
    } catch(e) {
        reject(e);
    }
}


let resolvePromise = function(promise2, x, resolve, reject) {
    if(promise2 === x) throw new Error('111')
    let called = false
    if(x instanceof Promise) {
        if(x.state === PENDING) {
            x.then((value) => {
                resolvePromise(promise2, value, resolve, reject)
            }, (reason) => {
                reject(reason)
            })
        } else {
            x.then(resolve,reject)
        } 
    }else if (x && (typeof x === 'object' || typeof x === 'function')) { //x为对象或者函数
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

Promise.prototype.then = function(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => reason
    let that = this
    let promise2 = new Promise((resolve, reject) => {
        if(that.state === FULFILLED) {
            setTimeout(() => {
                let x = onFulfilled(that.value)
                resolvePromise(promise2, x, resolve, reject)
            })
        } else if(that.state === REJECTED) {
            setTimeout(() => {
                let x = onRejected(that.value)
                resolvePromise(promise2, x, resolve, reject)
            })
        } else if(that.state === PENDING) {
            that.onFulfilledCallBacks.push(() => {
                setTimeout(() => {
                    let x = onFulfilled(that.value)
                    resolvePromise(promise2, x, resolve, reject)
                })
            })
            that.onRejectedCallBacks.push(() => {
                setTimeout(() => {
                    let x = onRejected(that.value)
                    resolvePromise(promise2, x, resolve, reject)
                })
            })
        }
    })
    return promise2
}
// 指定失败的回调函数
Promise.prototype.catch = function(onRejected) {
    this.then(null, onRejected)
}

Promise.resolve = function(value) {
    return new Promise((resolve) => {
        resolve(value)
    })
}
Promise.reject = function(reason) {
    return new Promise((resolve,reject) => {
        reject(reason)
    })
}

Promise.all = function(promises) {
    return new Promise((resolve, reject) => {
        let addValue = gen(promises.length, resolve)
        promises.forEach((promise) => {
            promise.then((val) => {
                addValue(val)
            },reject)
        })
    })

    function gen(length, resolve) {
        let values = []
        return function(val) {
            values.push(val)
            if(values.length === length) {
                resolve(values)
            }
        }
    }
}

Promise.race = function(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach((promise) => {
            promise.then(resolve,reject)
        })
    })
}