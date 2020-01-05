// var arrayFlatten = function(arr) {
//     let newArr = arr.reduce((pre, cur, index) => {
//         if(Array.isArray(cur)) {
//             pre = pre.concat(arrayFlatten(cur))
//         } else {
//             pre.push(cur)
//         }
//         return pre
//     }, [])
//     return newArr
// }
var arrayFlatten = function(arr) {
    return arr.toString().split(',').map((item) => Number(item))
}
console.log(arrayFlatten([1,[4,[3,4,[2415,346],12,3],5,6],2,3,[4,5,[1,3,4],6]]))
// var promise1 = new Promise(function(resolve, reject) {
//     setTimeout(function(){
//         console.log('resolve--------promise1')
//         resolve('promise1')
//     }, 5000);
//   });
//   var promise2 = new Promise(function(resolve, reject) {
//     setTimeout(function(){
//         console.log('resolve--------promise2')
//         resolve('promise2')
//     }, 3000);
//   });
//   var promise3 = new Promise(function(resolve, reject) {
//     setTimeout(function(){
//         console.log('reject--------promise3 => 第一个异步任务执行完毕')
//         reject('promise3')
//     }, 1000);
//   });
  
//   Promise.race([promise1, promise2, promise3]).then(function(success){
//       console.log('success--------'+success);
//   }).catch(function(error){
//       console.log('error--------'+error+'=> 立即执行.then(),之后会继续执行未完成的异步任务promise2、promise1');
//   })
  // 
  /*
  log:reject--------promise3 => 第一个异步任务执行完毕
      error--------promise3=立即执行.then(),之后会继续执行未完成的异步任务promise2、promise1
      index.html:20 resolve--------promise2
      index.html:14 resolve--------promise1
  */

  // 顺次调用
//   let promise1 = new Promise(function(resolve, reject) {
//     console.log('new promise1');

//     setTimeout(function() {
//         console.log('promise1 resolved');
//         return resolve("promise1 success");
//     }, 2000);
// });

// let promise2 = new Promise(function(resolve, reject) {
//     console.log('new promise2');

//     setTimeout(function() {
//         console.log('promise2 resolved');
//         return resolve("promise2 success");
//     }, 6000);
// });
// promise1.then(function(value) {
//     console.log('then1 callback', value);
//     return value;
// }).then(function(value) {
//     console.log('then2 callback', value);
//     return promise2;
// }).then(function(value) {
//     console.log('then3 callback', value);
//     return '';
// })