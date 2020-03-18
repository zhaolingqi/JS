/**
 * generator 自动执行函数
 */
/**
 * raskDof是一个generator
 * 
 * @param {generator} taskDef 
 */
 function run(taskDef) {
    
    // 创建一个无使用限制的迭代器
    let task = taskDef()

    // 开始执行任务
    let result = task.next()

    // 循环调用next()函数
    function step() {
        // 如果任务未完成则继续执行（即result.done为false）
        if(!result.done) {
            // result.value 为一个异步函数
            if(typeof result.value === "function") {
                // 执行异步函数并确定回调函数
                result.value((err, date) => {
                    if(err) {
                        task.throw(err) 
                    }
                    result = task.next(date)
                    step()
                })
            } else {
                result = task.next(result.value)
                step()
            }
        }
    }

    step()
 }

/**
 * Promise的Generator函数自动执行器
 * @param {Generator} taskDef 
 */
function runPromise(taskDef) {
    let task = taskDef()

    function step(data) {
        let result = task.next(data)
        if(!result.done) {
            result.value.then((val) => {
                step(val)
            }).catch((err) => {
                task.throw(new Error(err))
            })
        } else return
    }

    step()
}

/**
 * Thunk函数
 * 将多参数转化为单参数，且只接受回调函数作为参数
 */
function Thunk(fn) {
    return function() {
        let args = [...arguments]
        let that = this
        return function(callback) {
            var called
            args.push(function() {
                if(called) return
                called = true
                callback.apply(null, arguments)
            })
            return fn.apply(that, args)
        }
    }
}


/**
 * co函数
 * Generator函数的自动执行器，返回一个Promise对象
 * Generator函数的自动执行器
 * （1）回调函数。将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。
 * （2）Promise 对象。将异步操作包装成 Promise 对象，用 then 方法交回执行权。
 */
function co(taskDef) {
    let that = this
    return new Promise((resolve, reject) => {
        if(typeof taskDef === 'function') let task = taskDef.call(that)
        if(!task || typeof task.next !== 'function') return resolve(task)
        try {
            let result = task.next(data)
        } catch(e) {
            reject(e)
        }
        function step(data) {
            if(result.done) {
                return resolve(result.value)
            }
            let value = toPromise(result.value)
            value.then((data) => {
                result = task.next(data)
                step(data)
            }, (err) => {
                try {
                    result = task.throw(new Error(err))
                    step(data)
                } catch(e) {
                    reject(e)
                }
            })
        }
        step()
    })


    function isPromise(obj) {
        return typeof obj.then === 'function'
    }
    function toPromise(obj) {
        if(isPromise(obj)) return obj
        if('function' == typeof obj) return thunkToPromise(obj)
    
    }
    function thunkToPromise(fn) {
        return new Promise((resolve, reject) => {
            fn((err,res) => {
                if(err) return reject(err)
                resolve(res)
            })
        })
    }
}




  /**
  * async 函数是generator的语法糖
  * async对Generator函数的改进主要有
  * 1。 内置执行器。Generator函数执行必须依靠执行器，而async自带执行器
  * 2. 更好的语义 
  * 3. 更广的适用性 co函数库约定，yield后面只能是Thunk函数或Promise对象
  */
 async function fn(args) {

 }
 // 等同于
 function fn(args) {
     return spawn(function*() {

     })
 }

 function spawn(genF) {
    return new Promise((resolve, reject) => {
        var gen = genF()

        function step() {
            try {
                let result = gen.next()
            } catch(e){
                reject(e)
            }
            if(result.done) return resolve(result.value)
            
            // 转换成Promise对象
            Promise.resolve(result.value).then((val) => {
                result = result.next(val)
                step(result)
            }, (err) => {
                result = result.throw(new Error(err))
                step(result)
            })
        }
        step()
    })
 }