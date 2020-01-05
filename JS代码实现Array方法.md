# JS代码实现Array方法



Array.map

~~~js
Array.prototype.myMap = function(fn, context) {
    let arr = this
    let newArr = []
    for(let i = 0; i < arr.length; i++) {
        arr.push(fn.call(context, arr[i], i, arr))
    }
    return newArr
}
~~~



Array.filter

