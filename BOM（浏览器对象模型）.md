# BOM

## window对象

### 全局作用域

​	window对象扮演着ECMAScript中Global对象的角色，因此所有在全局作用域中声明的变量、函数，都会成为window的对象

​	定义全局变量和在windo对象上直接定义属性差别：全局变量不能通过delete操作符删除，而直接在window对象上的定义的属性可以

### 窗口关系及框架

如果页面中包含框架，则每个框架都拥有自己的window对象，并且保存在frames集合中。在frames集合中，可以通过数值索引（从0开始，从左至右，从上至下）或者框架名称来访问相应的window对象，每个window对象都有一个name属性

#### 窗口位置

IE、Safari、Oprea、Chrome都提供了screenLeft和screenTop属性

Firefox、Safari、Chrome也提供了screenX和screenY

~~~javascript
var LeftPos = (typeof window.screenLeft == "number") ? window.screenLeft: window.screenX
var topPos = (typeof window.screenTop == "number") ? window.screenTop: window.screenY
~~~

#### 窗口大小

innerWidth、innerHeight、outerWidth、OuterHeight

#### 导航和打开窗口

`window.open()`既可以导航到一个特定的URL，也可以打开一个新的浏览器窗口。这个方法可以接受四个参数：要加载的URL，窗口目标，一个特性字符串、一个表示新页面是否取代浏览器历史记录中当前加载页面的布尔值



`window.open()`会返回一个指向新窗口的引用。引用的对象与其他window对象大致相似



## location对象

提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能。事实上，location即使window对象的属性，也是document对象的属性，即`window.location`和`document.location`引用的是同一个对象

| 属性名   | 例子 | 说明                                  |
| -------- | ---- | ------------------------------------- |
| hash     |      | URL中的hash（#号后跟零或多个字符）    |
| host     |      | 服务器名称和端口号（如果有）          |
| hostname |      | 不带端口号的服务器名称                |
| href     |      | 当前加载页面的完整URL。location对象的 |
| pathname |      | URL中的目录和（或）文件名             |
| port     |      | URL中指定的端口号                     |
| search   |      | URL的查询字符串                       |
| protocol |      | 页面使用的协议                        |

![image-20200118205255590](\image-20200118205255590.png)

### 位置操作

使用`assign()`方法并为其传递一个URL可以改变浏览器的位置

`location.assign(https://xx.com)`

如果将`location.href`或`window.location`赋值为一个URL也会以该值调用`assign()`方法

另外修改location对象的其他属性也可以改变当前加载的页面



这些操作会在浏览器的历史记录中生成一条新的记录，并可通过“后退”按钮返回，如果要禁用这种行为，可以使用replace方法

`location.replace("xxxxxx")`



