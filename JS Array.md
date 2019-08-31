# JS常用类型(Array, Date)

## Array

### 属性

#### Array.length

#### Array.prototype

### 方法

#### Array.from() 

从一个类似数组或可迭代对象中创建一个新的，浅拷贝的数组实例

~~~javascript
Array.from(arrayLike[, mapFn[, thisArg]])
// arrayLike 想要转换成数组的伪数组对象或可迭代对象。
// mapFn (可选参数) 如果指定了该参数，新数组中的每个元素会执行该回调函数。
// thisArg (可选参数) 可选参数，执行回调函数 mapFn 时 this 对象。
// 返回值 一个新的数组实例
~~~

##### Array from a `String`

```js
Array.from('foo'); 
// ["f", "o", "o"]
```

##### Array from a `Set`

```js
let s = new Set(['foo', window]); 
Array.from(s); 
// ["foo", window]
```

##### Array from a `Map`

```js
let m = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(m); 
// [[1, 2], [2, 4], [4, 8]]
```

##### Array from an Array-like object (arguments)

```js
function f() {
  return Array.from(arguments);
}

f(1, 2, 3);

// [1, 2, 3]
```

##### 在`Array.from`中使用箭头函数

```js
// Using an arrow function as the map function to
// manipulate the elements
Array.from([1, 2, 3], x => x + x);  
// x => x + x代表这是一个函数，只是省略了其他的定义，这是一种Lambda表达式的写法
// 箭头的意思表示从当前数组中取出一个值，然后自加，并将返回的结果添加到新数组中    
// [2, 4, 6]


// Generate a sequence of numbers
// Since the array is initialized with `undefined` on each position,
// the value of `v` below will be `undefined`
Array.from({length: 5}, (v, i) => i);
// [0, 1, 2, 3, 4]
```

##### 数组去重合并

```js
function combine(){ 
    let arr = [].concat.apply([], arguments);  //没有去重复的新数组 
    return Array.from(new Set(arr));
} 

var m = [1, 2, 2], n = [2,3,3]; 
console.log(combine(m,n));                     // [1, 2, 3]
```



#### Array.isArray()

用于确定传递的值是否是一个Array

```javascript
Array.isArray(obj)
```



#### Array.of()

创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。

 `Array.of()` 和 `Array` 构造函数之间的区别在于处理整数参数：`Array.of(7)` 创建一个具有单个元素 **7** 的数组，而 **Array(7)** 创建一个长度为7的空数组（**注意：**这是指一个有7个空位(empty)的数组，而不是由7个`undefined`组成的数组）。

```js
Array.of(7);       // [7] 
Array.of(1, 2, 3); // [1, 2, 3]

Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]
```



#### Array.prototype.concat() 

用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组

如果传给concat（）的是一个或者多个数组，则会将数组的每一项添加到结果数组中

```js
var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])
```

```javascript
array.concat(value,...)
var a = [1,2,3]
a.concat(4,5) // 返回 [1,2,3,4,5]
```

##### 合并嵌套数组

以下代码合并数组并保留引用：

```js
var num1 = [[1]];
var num2 = [2, [3]];
var num3=[5,[6]];

var nums = num1.concat(num2);

console.log(nums);
// results is [[1], 2, [3]]

var nums2=num1.concat(4,num3);

console.log(nums2)
// results is [[1], 4, 5,[6]]

// modify the first element of num1
num1[0].push(4);

console.log(nums);
// results is [[1, 4], 2, [3]]
```



#### Array.prototype.copyWithin()

浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。

```js
arr.copyWithin(target[, start[, end]])
// target 0 为基底的索引，复制序列到该位置。如果是负数，target 将从末尾开始计算。如果 target 大于等于 arr.length，将会不发生拷贝。如果 target 在 start 之后，复制的序列将被修改以符合 arr.length。
// start  0 为基底的索引，开始复制元素的起始位置。如果是负数，start 将从末尾开始计算。如果 start 被忽略，copyWithin 将会从0开始复制。
// end    0 为基底的索引，开始复制元素的结束位置。copyWithin 将会拷贝到该位置，但不包括 end 这个位置的元素。如果是负数， end 将从末尾开始计算。如果 end 被忽略，copyWithin 方法将会一直复制至数组结尾（默认为 arr.length）。
```



#### Array.prototype.entries()

返回一个新的**Array Iterator**对象，该对象包含数组中每个索引的键/值对。


#### Array.prototype.erery() 

测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。如果函数对每一项都返回true，则返回true

```js
arr.every(callback[, thisArg])
// callback 用来测试每个元素的函数，它可以接受三个参数
// element 用于测试当前值
// index 可选 用于测试的当前值的索引
// array 可选 调用every的当前数组

//thisArg 执行callback时使用的this值
```

#### Array.prototype.fill()

用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。返回修改后的数组。  

```js
arr.fill(value[, start[, end]])
//- value` 用来填充数组元素的值。
//`start`  可选 起始索引，默认值为0。
//`end`  可选 终止索引，默认值为 `this.length`。
```



#### Array.prototype.filter()

创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。

返回值 一个新的、由通过测试的元素组成的数组，如果没有任何数组元素通过测试，则返回空数组。 

```js
var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
```



#### Array.prototype.find()

返回数组中满足提供的测试函数的第一个元素的值。否则返回 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)。

返回 数组中第一个满足所提供测试函数的元素的值

```js
arr.find(callback[, thisArg])
// callback 用来测试每个元素的函数，它可以接受三个参数
// element 用于测试当前值
// index 可选 用于测试的当前值的索引
// array 可选 调用every的当前数
```



#### Array.prototype.findIndex()

返回数组中满足提供的测试函数的第一个元素的**索引**。否则返回-1。

```js
arr.findIndex(callback[, thisArg])
```



#### Array.prototype.flat()

按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

返回值 一个包含将数组与子数组中所有元素的新数组

```js
var newArray = arr.flat(depth)
// depth 可选 指定要提取嵌套数组的结构深度，默认值为 1。
```



#### Array.prototype.flatMap()

首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 和 深度值1的 [flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) 几乎相同，但 `flatMap` 通常在合并成一种方法的效率稍微高一些。

返回值  一个新的数组，其中每个元素都是回调函数的结果，并且结构深度 `depth` 值为1。

```js
var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
    // 返回新数组的元素
}[, thisArg])
```



####  Array.prototype.forEach()

对数组的每个元素执行一次提供的函数。

返回值 undefined

```js
arr.forEach(callback[, thisArg]);
```



#### Array.prototype.includes()

判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。

**注意：对象数组不能使用includes方法来检测。**

```js
arr.includes(valueToFind[, fromIndex])
// valueToFind 需要查找的元素值
// fromIndex 可选 从fromIndex索引处开始查找。 如果为负值，则按升序从 array.length + fromIndex 的索引开始搜 （即使从末尾开始往前跳 fromIndex 的绝对值个索引，然后往后搜寻）。默认为 0。
```



#### Array.prototype.indexOf()

返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

```js
arr.indexOf(searchElement)
arr.indexOf(searchElement[, fromIndex = 0])
```



#### Array.prototype.join()

将一个数组（或一个[类数组对象](https://developer.mozilla.org/zh-CN//docs/Web/JavaScript/Guide/Indexed_collections#Working_with_array-like_objects)）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。

返回值 一个所有数组元素连接的字符串。如果 `arr.length` 为0，则返回空字符串。



#### Array.prototype.keys()

返回一个包含数组中每个索引键的`Array Iterator`对象。



#### Array.prototype.lastIndexOf()

返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 `fromIndex` 处开始。



#### Array.prototype.map()

创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

```js
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
 // Return element for new_array 
}[, thisArg])
```



#### Array.prototype.pop()

从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。



#### Array.prototype.push()

将一个或多个元素添加到数组的末尾，并返回该数组的新长度。

```js
arr.push(element1, ..., elementN)
```



#### Array.prototype.reduce()

对数组中的每个元素执行一个由您提供的**reducer**函数(升序执行)，将其结果汇总为单个返回值。

返回值 函数累计处理的结果

```js
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
//	callback 执行数组中每个值的函数，包含四个参数：
//		accumulator 累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue
//		currentValue 数组中正在处理的元素。
//		currentIndex 可选 数组中正在处理的当前元素的索引。 如果提供了initialValue，则起始索引号为0，否则为1。
//		array (源数组)
//	initialValue 作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。
```



#### Array.prototype.reduceRight()

接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值。

```js
arr.reduceRight(callback[, initialValue])
```



#### Array.prototype.reverse()

将数组中元素的位置颠倒，并返回该数组。该方法会改变原数组。



####  Array.prototype.shift()

从数组中删除**第一个**元素，并返回该元素的值。此方法更改数组的长度。



#### Array.prototype.slice()

返回一个新的数组对象，这一对象是一个由 `begin` 和 `end` 决定的原数组的**浅拷贝**（包括 `begin`，不包括`end`）。原始数组不会被改变。

返回值 一个含有被提取元素的新数组。

```js
arr.slice([begin[, end]])
// begin 可选 提取起始处的索引，从该索引开始提取原数组元素，默认为 0。
//	如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取，slice(-2) 表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）。
// 如果 begin 大于原数组的长度，则会返回空数组。
// end 可选
// 提取终止处的索引，在该索引处结束提取原数组元素，默认为 0。slice 会提取原数组中索引从 begin 到 end 的所有元素（包含 begin，但不包含 end）。
// 如果该参数为负数， 则它表示在原数组中的倒数第几个元素结束抽取。 slice(-2,-1) 表示抽取了原数组中的倒数第二个元素到最后一个元素（不包含最后一个元素，也就是只有倒数第二个元素）。
```

  

#### Array.prototype.some()

测试是否至少有一个元素可以通过被提供的函数方法。该方法返回一个Boolean类型的值。

如果回调函数返回至少一个数组元素的[truthy](https://developer.mozilla.org/en-US/docs/Glossary/truthy)值，则返回**true**；否则为`**false**`。

```js
arr.some(callback(element[, index[, array]])[, thisArg])
```

  

#### Array.prototype.sort()

```js
arr.sort([compareFunction])
//	compareFunction 可选 用来指定按某种顺序进行排列的函数。如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序。
//		firstEl 第一个用于比较的元素。
//		secondEl 第二个用于比较的元素。
```

  

#### Array.prototype.splice()

通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。

返回值 由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。

```js
array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
//	start 指定修改的开始位置（从0计数）。如果超出了数组的长度，则从数组末尾开始添加内容；如果是负值，则表示从数组末位开始的第几位（从-1计数，这意味着-n是倒数第n个元素并且等价于array.length-n）；如果负数的绝对值大于数组的长度，则表示开始位置为第0位。

//	deleteCount 整数，表示要移除的数组元素的个数。
//	如果 deleteCount 大于 start 之后的元素的总数，则从 start 后面的元素都将被删除（含第 start 位）。
//	如果 deleteCount 被省略了，或者它的值大于等于array.length - start(也就是说，如果它大于或者等于start之后的所有元素的数量)，那么start之后数组的所有元素都会被删除。
//	如果 deleteCount 是0或者负数，则不移除元素。这种情况下，至少应添加一个新元素。

//	item1, item2, ... 要添加进数组的元素,从start 位置开始。如果不指定，则 splice() 将只删除数组元素。
```



#### Array.prototype.toLocaleString()

返回一个字符串表示数组中的元素。数组中的元素将使用各自的 `toLocaleString` 方法转成字符串，这些字符串将使用一个特定语言环境的字符串（例如一个逗号 ","）隔开。

```js
arr.toLocaleString([locales[,options]]);
// locales 可选
```

  

#### Array.prototype.unshift()

将一个或多个元素添加到数组的**开头**，并返回该数组的**新长度(该**方法修改原有数组**)**。

```js
arr.unshift(element1, ..., elementN)
```



## Date

