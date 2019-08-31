# BOM

## window对象

### 全局作用域

​	window对象扮演着ECMAScript中Global对象的角色，因此所有在全局作用域中声明的变量、函数，都会成为window的对象

​	定义全局变量和在windo对象上直接定义属性差别：全局变量不能通过delete操作符删除，而直接在window对象上的定义的属性可以

### 窗口关系及框架

### 窗口位置

IE、Safari、Oprea、Chrome都提供了screenLeft和screenTop属性

Firefox、Safari、Chrome也提供了screenX和screenY

~~~javascript
var LeftPos = (typeof window.screenLeft == "number") ? window.screenLeft: window.screenX
var topPos = (typeof window.screenTop == "number") ? window.screenTop: window.screenY
~~~

### 窗口大小

