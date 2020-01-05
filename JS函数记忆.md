## JS函数记忆

如果需要大量重复的计算，或者大量计算又依赖于之前的结果，便可以考虑使用函数记忆。

 

```js
// 第一版 (来自《JavaScript权威指南》)
function memoize(f) {
    var cache = {};
    return function(){
        var key = arguments.length + Array.prototype.join.call(arguments, ",");
        if (key in cache) {
            return cache[key]
        }
        else {
            return cache[key] = f.apply(this, arguments)
        }
    }
}
```

```js
// 第二版 (来自 underscore 的实现)
var memoize = function(func, hasher) {
    var memoize = function(key) {
        var cache = memoize.cache;
        var address = '' + (hasher ? hasher.apply(this, arguments) : key);
        if (!cache[address]) {
            cache[address] = func.apply(this, arguments);
        }
        return cache[address];
    };
    memoize.cache = {};
    return memoize;
};
```

如果需要支持多参数，就需要传入hasher函数，自定义存储的key值。考虑使用JSON.stringfy

```js
hasher = function(){
    var args = Array.prototype.slice.call(arguments)
    return JSON.stringify(args)
}
```

