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

   

## 第九章 JavaScript中的类

### 类的声明

```js
class Person {
    
    // 等价于构造函数，
    constructor(name) {
        this.name = name
    }
	// 等价于原型上声明的方法
    sayName() {
        console.log(this.name)
    }
}

let p = new Person('hahha')
console.log(typeof Person)  // function
console.log(Object.getOwnPropertyDescriptor(Person, "prototype"))
//{ value: Person {},
//  writable: false,
//  enumerable: false,
//  configurable: false }
```

类声明仅仅时基于已有的自定义类型声明的语法糖。Person声明实际上创建了一个具有构造函数方法行为的函数，`sayName`实际上是`Person.prototype`上的一个方法

与函数不同的是，类属性不可被赋予新值

**类与自定义类型的差别：**

- 函数声明可以被提升，而类声明与let声明类似，不会被提升
- 类声明中的所有代码将自动运行在严格模式下
- 在自定义类型中，可以通过        `Object.defineProperty()`手工指定某个方法为不可枚举，而在类中，所有方法都是不可枚举的
- 每个类都有一个名为`[[Construct]]`的内部方法，通过关键词new调用那些不含`[[Construct]]`的方法会导致程序报错
- 使用除关键词 new 以外的方法调用类的构造函数会导致程序抛出错误
- 在类中修改类名会导致程序报错

​     

##  Promise

### Promise的基础知识

#### promise的生命周期

- pending 进行中
- fulfilled Promise异步操作完成
- rejected 由于程序出错或者其他一些原因，Promise异步操作未能成功

内部属性`[[PromiseState]]`用于表示上述三种状态。这个属性不暴露在Promise对象上，不能以编程的方式检测Promise的状态

所有Promise都有`then()`方法，接受两个参数：第一个是当Promise的状态变为fulfilled时要调用的函数，第二个是状态变为rejected时调用的函数s

> 如果有一个对象实现了上述的then()方法，则将这个对象称之为`thenable`对象。所有的对象都是`thenable`对象，但并非所有的`thenable`对象都是Promise

Promise还有一个`catch()`方法，相当于只给传入拒绝处理程序的`then()`方法

```js
let fs = require("fs")
function readFile(filename) {
    return new Promise((resolve, reject) => {
        // 触发异步操作
        fs.readFile(filename, {encoding: "utf-8"}, (err, contents) => {
            if(err) {
                reject(err)
                return ;
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

// 上下两种效果一样

// 同时监听执行完成和执行被拒
promise.then((value) => {
    // 执行完成
    console.log(value)
}).catch((err) => {
    console.log(err)
})
```



#### 执行器错误

如果执行器内部抛出一个错误，则Promise的拒绝处理程序会被调用

```js
let pro = new Promise((resolve, reject) => {
    throw new Error("EEEEEE")
})
pro.catch(err => console.log(err))

```

每个执行其中都隐含一个try-catch块，上例等价于

```js
let pro = new Promise((resolve, reject) => {
    try {
        throw new Error("EEEEEE")
    } catch(ex) {
        reject(ex)
    }
})
pro.catch(err => console.log(err))
```



### 全局Promise拒绝处理

如果在没有拒绝处理程序的情况下拒绝一个Promise，那么不会提示失败信息。

Promise的特性决定了很难检测一个Promise是否被处理过，任何时候都可以调用`then()`或者`catch()`方法，无论Promise是否已经解决，这两个方法都可以正常运行，但这样很难知道一个Promise何时被处理。

#### Node.js环境的拒绝处理

在`Node.js`中处理Promise拒绝时会触发`process`对象上的两个事件

- `unhandledRejection`在一个事件循环中，当Promise被拒绝，并且没有提供拒绝处理
- `rejectionHandled` 在一个事件循环后，当Promise被拒绝时，若拒绝处理程序被调用，触发该事件

每次调用`then()``catch()`方法时实际上创建并返回了另一个Promise，只有当第一个Promise完成或被拒绝后，第二个才会被解决。

```js
let rejected

process.on("unhandledRejection", function(reason, promise) {
    console.log(reason.message)
    console.log(promise === rejected)
})

rejected = Promise.reject(new Error("EEEEE"))
```



#### 浏览器环境的拒绝处理

也是通过触发上面两个事件来进行Promise的拒绝处理，不过这两个事件是在window对象上的。且两个事件中都可以使用拒绝值



```js
let rejected

window.onunhandledrejection = function(event) {
    console.log(event.type, event.reason, event.promise)
}

window.onrejectionhandled = function(event) {
    console.log(event.type, event.reason, event.promise)
}

rejected = Promise.reject(new Error("EEEEE"))
```



### 串联Promise

每次调用`then()``catch()`方法实际上创建并返回了另一个Promise，只有当第一个Promise完成或被拒绝后，第二个才会被解决

```js
let p1 = new Promise((resolve, reject) => {
    resolve(42)
})

p1.then(value => console.log(value))
    .then(() => console.log('Finished'))
```

调用`p1.then()`后返回第二个Promise，紧接着又调用了它的`then()`方法

#### 捕获错误

~~~js
let p1 = new Promise((resolve, reject) => {
    resolve(42)
})

p1.then(value => throw new Error("Boom!"))
    .catch((err) => console.log(err.message))
~~~

p1的完成处理程序抛出一个错误，链式调用第二个Promise的catch方法后，通过它的拒绝处理程序接受这个错误。

> 务必在Promise链的末尾留有一个拒绝处理程序以确保能够正确处理所有可能发送的错误

#### Promise链中的返回值

Promise链的另一个重要特性是可以给下游Promise传递数据

```js
let p1 = new Promise((resolve, reject) => {
    resolve(42)
})

p1.then(value => {
  	console.log(value)  //42
    return value + 1  
}).then((value) => {
    console.log(value)  //43
})
```

如果返回的是Promise对象，会通过一个额外的步骤确定下一步怎么走

~~~js
let p1 = new Promise((resolve, reject) => {
    resolve(42)
})

let p2 = new Promise((resolve, reject) => {
    resolve(44)
})

p1.then(value => {
  	console.log(value)  //42
    return p2  
}).then((value) => {
    console.log(value)  //44
})
~~~



### 响应多个Promise

`Promise.all()`和`Promise.race()`两个方法可以监听多个Promise  

#### `Promise.all()`方法

`Promise.all()`方法只接受一个参数并返回一个Promise，该参数是一个含有多个受监视Promise的可迭代对象（例如，一个数组），只有当可迭代对象中所有Promise都被解决后返回的Promise才会被解决，只有当可迭代对象中所有Promise都被完成后返回的Promise才会被完成

```js
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(42)
    }, 1000)
})

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(44)
    }, 2000)
})

let p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(45)
    }, 4000)
})

let p4 = Promise.all([p1, p2, p3])
let pre = +new Date()
p4.then((value) => {
    console.log(+new Date() - pre)  // 4001
    console.log(value)  // 42 44 45
})
```

所有传入`Promise.all()`方法的Promise只要有一个被拒绝，那么返回的Promise没等所有Promise都完成就立即被拒绝

```js
let p1 = new Promise((resolve, reject) => {

    setTimeout(() => {
        resolve(42)
    }, 1000)
})

let p2 = new Promise((resolve, reject) => {

    setTimeout(() => {
        reject(44)
    }, 2000)
})

let p3 = new Promise((resolve, reject) => {

    setTimeout(() => {
        resolve(45)
    }, 4000)
})

let p4 = Promise.all([p1, p2, p3])
let pre = +new Date()
p4.then((value) => {
    console.log(+new Date() - pre)
    console.log(value)
}).catch((err) => {
    console.log(+new Date() - pre)  // 2001
    console.log(err)  // 44
})
```

#### `Promise.race()`

`Promise.race()`方法监听多个Promise的方法稍有不同，只要有一个Promise被解决返回的Promise就被解决

传给`Promise.race()`方法的Promise会进行竞选，以决出哪一个先被解决，如果先解决的是已完成Promise，则返回已完成Promise。如果先解决的是已拒绝Promise，则返回已拒绝Promise。



### await 和 async

#### async

> 函数前面的async一词意味着一个简单的事情：这个函数总是返回一个promise，如果代码中有return <非promise>语句，JavaScript会自动把返回的这个value值包装成promise的resolved值;调用就像普通函数一样调用,但是后面可以跟then()了

#### await

> await只能在async函数里使用,它可以让JavaScript进行等待，直到一个promise执行并返回它的结果，JavaScript才会继续往下执行.
>  await 可以用于等待的实际是一个返回值,可是promise的返回值,也可以是普通函数的返回值,或者使一个变量, 注意到 await 不仅仅用于等 Promise 对象，它可以等任意表达式的结果，所以，await 后面实际是可以接普通函数调用或者直接变量的。

```js
async function f() {    // await 只能在async函数中使用
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('done!'), 1000)
    })
    let result = await promise   //  直到promise返回一个resolve值（*）才会执行下一句
    alert(result) // 'done!' 
}
f()
```

##### await的异常处理

多个await连续时，会一个一个同步执行，如果中间有一个reject了，就会停止后面代码的执行，所以需要用`try ... catch`处理错误

```js
 async getFaceResult () {
       try {
          let location = await this.getLocation(this.phoneNum);
           if (location.data.success) {
                   let province = location.data.obj.province;
                    let city = location.data.obj.city;
                    let result = await this.getFaceList(province, city);
                    if (result.data.success) {
                       this.faceList = result.data.obj;
                   }
               }
       } catch(err) {
            console.log(err);
       }
 }
```

