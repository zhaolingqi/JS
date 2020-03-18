## Promise

## 1.Syntax（语法）

> **new Promise(executor)**;

**executor：**

传递参数resolve和reject的函数。executor函数由Promise实现立即执行，传递resolve和reject函数(在Promise构造函数返回创建的对象之前调用executor)。当调用resolve和reject函数时，分别代表已完成和已失败。当执行程序完成，成功则调用resolve，出现错误则调用reject。

## 2.Description（描述）

**Promise**允许异步方法返回与同步方法类似的值:异步方法不是立即返回最终值，而是返回一个Promise，在将来的某个时候提供该值。

**Promise状态:**

- **pending** : 初始状态，未完成或拒绝。
- **fulfilled** : 意味着操作成功完成。
- **rejected** : 表示操作失败。

*返回的**Promise**的**prototype**下有**.then()**和**.catch()**方法*
![图片描述](https://segmentfault.com/img/bVbpzDt?w=801&h=297)

## 3.Methods（方法）

> **Promise.all(iterable)**

返回一个Promise，这个Promise在所有可迭代参数中的所有Promise都fulfilled成功返回，或者在可迭代参数中的一个Promise为rejects失败时返回。

```js
var promise1 = new Promise(function(resolve, reject) {
  setTimeout(resolve('promise1'), 100);
});
var promise2 = new Promise(function(resolve, reject) {
  setTimeout(resolve('promise2'), 50);
});

Promise.all([promise1, promise2]).then(function(values){
  console.log(values);
});
// log: Array [promise1, promise2]
```

> **Promise.race(iterable))**

返回一个Promise，这个Promise在所有可迭代参数中只要有一个Promise执行完毕，则会立刻执行.then()，之后会继续执行剩下的Promise直到结束。

```js
var promise1 = new Promise(function(resolve, reject) {
  setTimeout(function(){
      console.log('resolve--------promise1')
      resolve('promise1')
  }, 5000);
});
var promise2 = new Promise(function(resolve, reject) {
  setTimeout(function(){
      console.log('resolve--------promise2')
      resolve('promise2')
  }, 3000);
});
var promise3 = new Promise(function(resolve, reject) {
  setTimeout(function(){
      console.log('reject--------promise3 => 第一个异步任务执行完毕')
      reject('promise3')
  }, 1000);
});

Promise.race([promise1, promise2, promise3]).then(function(success){
    console.log('success--------'+success);
}).catch(function(error){
    console.log('error--------'+error+'=> 立即执行.then(),之后会继续执行未完成的异步任务promise2、promise1');
});
// 
/*
log:reject--------promise3 => 第一个异步任务执行完毕
    error--------promise3=立即执行.then(),之后会继续执行未完成的异步任务promise2、promise1
    index.html:20 resolve--------promise2
    index.html:14 resolve--------promise1
*/
```

> **Promise.reject()**

返回因给定原因被拒绝的Promise对象。

```js
function fnc(obj){
    return new Promise(function(reslove,reject){
        if(obj) reslove('success')
        else reject('error')
    })
}
fnc(false).then(function(success){
    console.log('success------'+success)
},function(error){
    console.log('error------'+error)
})
//log : error------error
**
```

> **Promise.resolve()**

返回使用给定值解析的Promise对象。如果值是thenable(即具有then方法)，返回的promise将“遵循”该thenable，采用其最终状态，否则，返回的promise将用值来实现。通常，如果不知道一个值是否是一个promise，那么promise.resolve(value)它，并将返回值作为一个promise来处理。

```js
function fnc(obj){
    return new Promise(function(reslove,reject){
        //根据obj的属性选择返回对应的状态
        if(obj) reslove('success')
        else reject('error')
    })
}
fnc(false).then(function(success){
    console.log('success------'+success)
},function(error){
    console.log('error------'+error)
})
//log : error------error
```