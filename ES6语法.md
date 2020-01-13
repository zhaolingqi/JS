##    第一章 块级作用域绑定

### 1.1 块级声明

let声明和var声明用法相同

1. let声明用于块级作用域，不会出现变量提升
2. let声明禁止重声明，即作用域中已存在某个标识符后，无法用let再次声明

const 声明

声明常量，即声明后无法更改数值，声明时必须初始化。

const声明对象时，不允许修改绑定，但允许修改对象属性的值

 

## 第二章 字符串和正则表达式

### 模板字面量（模板字符串）

ECMAScript6 通过模板字符量的方式对ECMAScript5中缺少的一些特性进行填补：

**多行字符串** 

**基本的字符串格式化**

**HTML转义**

#### 基础语法

用反撇号（`）代替单双引号

```js
let message = `Hello world`
console.log(message)  // Hello World
console.log(typeof message) //string
console.log(message.length) // 11
```

#### 多行字符串

```js
let mess = `Mutiline
string
121`
```

#### 字符串占位符

占位符由一个$和{}组成，中间可以包含任意的JS表达式

```js
let count = 10, price = 0.25
let message = `${count} items costs $${(count * price).toFixed(2)}.`
console.log(message) // 10 items costs $2.50.
```

模板字符串本身也是JavaScript表达式，所以可以在一个模板字面量里嵌入另外一个

## 第三章 函数

### 函数形参的默认参数

ECMAScript 6简化了为形参提供默认值的过程

```js
function makeRequest(url, timeout = 2000, callback = function(){}){
    
}
```

#### 默认参数对arguments的影响

ECMAScript5在非严格模式下，函数命名参数的变化会体现在arguments对象中，如

```js
function mixArgs(first, second) {
    console.log(first === arguments[0])     //true
    console.log(second === arguments[1])   //true
    first = "c"
    second = "d"
    console.log(first === arguments[0])   //true
    console.log(second === arguments[1])   //true
}
mixArgs("a","b")
// first,second 被赋予新值时，arguments也会相应更新
// 但是在严格模式下，并不会出现这种现象
```

在ES6中，如果采用了上述的默认参数的方式，arguments的行为将和ECMAScript5严格模式下保持一致。改变first和second并不会改变arguments的值

 

### 不定参数

在函数的命名参数前添加三个点`...`就表明这是一个不定参数，该参数为一个数组，包含着自它之后传入的所有参数，通过这个数组名即可逐一访问里面的参数。

```js
function pick(object, ...keys) {
    let result = Object.create(null)
    for(let i = 0, len = keys.length; i < len; i++) {
        result[keys[i]] = object[keys[i]]
    }
}
```



### 展开运算符

不定参数可以让你指定多个各自独立的参数，并通过整合后的数组来访问，而展开运算符可以让你指定一个数组，将它们打散后作为各自独立的参数传入函数。



### 箭头函数

特点：

1. 没有this、super、arguments、和new.target绑定
2. 不能通过new关键字调用
3. 没有原型
4. 不可以改变this的绑定
5. 不支持arguments对象
6. 不支持重复的命名参数



## 第五章 解构

为了从对象和数组中获取特定数据并赋值给变量

#### 对象解构

```js
let node = {
    type: "function",
    name: "foo"
}
let {type, name} = node

// 用var let const 解构对象时一定要初始化
```

**解构赋值**

用一对小括号包裹解构赋值语句

~~~js
let node = {
    type: "function",
    name: "foo"
}
type = "123"
name = 777
({type, name，value}) = node
console.log(node.type) // "123"
console.log(node.name) // 777
console.log(node.value) // undefined

({value = true}) = node
console.log(node.value) // true
~~~

如果指定的局部变量在对象中不存在，则这个局部变量会被赋值为undefined

**为非同名局部变量赋值**

~~~js
let node = {
    type: "function",
    name: "foo"
}
let {type: localType, name: localName} = node

// type: localType 读取node中type属性值，并存储在localType中

console.log(localType, localName)
~~~

#### 数组解构



~~~js
let colors = ["a","b","c","d","e"]
let [first, sec, , ,last] = colors

console.log(first, sec, last)  // "a" "b" "e"
~~~

 在这个过程中，数组本身并不会发生变化

**解构赋值**

```js
let colors = ["a","b","c","d","e"],
let first = "z",
let sec = "fg"
[first, sec] = colors
```



交换变量

```js
let a = 1, b = 2
[a, b] = [b, a]
```





## 第六章 Symbol和Symbol属性

### 创建Symbol

由于Symbol是原始值，因此调用`new Symbol()`会抛出错误

```js
let firstName = Symbol() 
let person = {}

person[firstName] = "Ni"
console.log(person[firstName])  // "hi"
```

在上述代码中，创建了一个名为`firstName`的Symbol，用它将一个新的属性值赋值给person对象，每当想要访问这个属性时，一定要用最初定义的Symbol

 Symbol定义的key无法被`for...in` 和 `Object.keys()`枚举

当使用`JSON.stringfy()`将对象转换成JSON字符串时，Symbol属性也会被排除在输出内容之外

所有可计算属性名的地方都可以使用Symbol



### Symbol的共享体系

在不同的代码中共享同一个Symbol

``` js
let uid = Symbol.for('uid')
let object = {
    [uid]: "123"
}

let uid2 = Symbol.for('uid')
console.log(uid === uid2) // true
console.log(object[uid2])  // "123"
```

`Symbol.for()`方法首先在全局Symbol注册表中搜索键为`uid`的`symbol`是否存在。如果存在，直接返回已有的`Symbol`，否则创建一个新的`Symbol`并使用这个`Symbol`在`Symbol`全局注册表中注册，随机返回新创建的`Symbol`

### Symbol与类型强制转换

`toString`方法会返回字符串类型的`Symbol`描述里的内容

但是不能将`Symbol`与一个字符串拼接，也不能将`Symbol`强制转换为数字类型



### Symbol属性检索

添加一个`Object.getOwnPropertySymbols()`方法来检索对象中的`Symbol`属性



## 第八章 迭代器和生成器

### 什么是迭代器

迭代器是一种特数对象，具有一些专门为迭代设计的接口，所有迭代器对象都有next()方法，每次调用返回一个结果对象，对象有两个属性value和done，done为一个布尔值，当它为true时，表示没有更多可返回数据



### 什么是生成器

生成器是一种返回迭代器的函数，通过function关键字后的星号来表示，函数中会用到新的关键字yield

```js
function *createIterator(item) {
    for(let i = 0; i < items.length; i++) {
        yield items[i] // yield 只能在生成器内部使用
    }
}

let iterator = createIterator([1,2,3])
console.log(iterator.next()) // {value: 1, done: false}
console.log(iterator.next()) // {value: 2, done: false}
console.log(iterator.next()) // {value: 3, done: false}
console.log(iterator.next()) // {value: undefined, done: true}
```



### 可迭代对象

可迭代对象具有Symbol.iterator属性，ES6中所有的集合对象（数组，Set集合和Map）和字符串都是可迭代对象

#### 访问默认迭代器

```js

let values = [2,3,4,5]
let iterator = values[Symbol.iterator]()

console.log(iterator.next())  //{ value: 2, done: false }
console.log(iterator.next())  //{ value: 3, done: false }
console.log(iterator.next())  //{ value: 4, done: false }
console.log(iterator.next())  //{ value: 5, done: false }
console.log(iterator.next())  //{ value: undefined, done: true }
```

#### 创建可迭代对象

默认情况下，开发者定义的对象都是不可迭代对象，但如果给Symbol.iterator属性添加一个生成器，则可以将其变为可迭代对象，如

```js
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
```

   

### 高级迭代器功能

#### 给迭代器传递参数

如果给迭代器的`next()`方法传递参数，则这个参数会代替生成器内部上一条`yield`语句的返回值。

这里有一个特例，第一次调用`next()`方法时，无论传入什么参数都会被丢弃

   

