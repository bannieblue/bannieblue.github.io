#es6

js

---
http://es6.ruanyifeng.com/#README
## let 和 const 命令
* let

>1. 基本用法
    * 在let命令所在的代码块内有效

    ```javascript
    {
      let a = 10;
      var b = 1;
    }
    a // ReferenceError: a is not defined.
    b // 1
    ```

 >   * for循环

    ```javascript
    var a = [];
    for (var i = 0; i < 10; i++) {
      a[i] = function () {
        console.log(i);
      };
    }
    a[6](); // 10
    for循环有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
    var a = [];
    for (let i = 0; i < 10; i++) {
      a[i] = function () {
        console.log(i);
      };
    }
    a[6](); // 6
    ```


> * 不存在变量提升

    ```javascript
    // var 的情况
    console.log(foo); // 输出undefined
    var foo = 2;
    // let 的情况
    console.log(bar); // 报错ReferenceError
    let bar = 2;
    ```
>* 暂时性死区
    只要块级作用域内存在let命令，它所声明的***变量*** 就“绑定”（binding）这个区域，不再受外部的影响

    ```javascript
    var tmp = 123;
    if (true) {
      tmp = 'abc'; // ReferenceError
      let tmp;
    }
    ```
>* 不允许重复声明
    let不允许在相同作用域内，重复声明同一个变量。

    // 报错
    function () {
      let a = 10;
      var a = 1;
    }
    // 报错
    function () {
      let a = 10;
      let a = 1;
    }
*因此，不能在函数内部重新声明参数*

    function func(arg) {
      let arg; // 报错
    }
    function func(arg) {
      {
        let arg; // 不报错(作用域不同)
      }
    }


>* 块级作用域
ES6 允许块级作用域的任意嵌套
内层作用域可以定义外层作用域的同名变量。

    {{{{
      let insane = 'Hello World';
      {let insane = 'Hello World'}
    }}}};
块级作用域的出现，实际上使得获得广泛应用的立即执行函数表达式（IIFE）不再必要了。
立即执行的函数表达式目的有两个：一是不必为函数命名，避免了污染全局变量；二是IIFE内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量

    // IIFE 写法
    (function () {
      var tmp = ...;
      ...
    }());
    // 块级作用域写法
    {
      let tmp = ...;
      ...
    }
ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。
但是，浏览器没有遵守这个规定，为了兼容以前的旧代码，还是支持在块级作用域之中声明函数.
ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。
ES6规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。
考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。

    // 函数声明语句
    {
      let a = 'secret';
      function f() {
        return a;
      }
    }
    // 函数表达式
    {
      let a = 'secret';
      let f = function () {
        return a;
      };
    }

* const 命令

>1. 基本用法
    const声明一个只读的常量。一旦声明，常量的值就不能改变。const一旦声明变量，就必须立即初始化，不能留到以后赋值。跟java中的final声明的变量差不多。
    const的作用域与let命令相同：只在声明所在的块级作用域内有效。
    const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。
    const声明的常量，也与let一样不可重复声明。
    const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。
``` javascript
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only

const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错
```

* 顶层对象的属性
>顶层对象在浏览器环境指的是window对象，在Node指的是global对象。ES5之中，顶层对象的属性与全局变量是等价的。
ES6为了改变这一点，一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。也就是说，从ES6开始，全局变量将逐步与顶层对象的属性脱钩。
``` javascript
var a = 1;
// 如果在Node的REPL环境，可以写成global.a
// 或者采用通用方法，写成this.a
window.a // 1

let b = 1;
window.b // undefined
```

* global 对象
>ES5 的顶层对象，本身也是一个问题，因为它在各种实现里面是不统一的。
浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self。
Node 里面，顶层对象是global，但其他环境都不支持。
很难找到一种方法，可以在所有情况下，都取到顶层对象。下面是两种勉强可以使用的方法:
``` javascript
// 方法一
(typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);

// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
```
## 变量的解构赋值

### 1. 数组的解构赋值

> ###基本用法
ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。
如：let [a, b, c] = [1, 2, 3];


 > * 只要等号两边的模式相同，左边的变量就会被赋予对应的值
    ``` javascript
    let [foo, [[bar], baz]] = [1, [[2], 3]];
    foo // 1
    bar // 2
    baz // 3
    let [ , , third] = ["foo", "bar", "baz"];
    third // "baz"
    let [x, , y] = [1, 2, 3];
    x // 1
    y // 3 
    let [head, ...tail] = [1, 2, 3, 4];
    head // 1
    tail // [2, 3, 4]
    let [x, y, ...z] = ['a'];
    x // "a"
    y // undefined
    z // []
    ```
    
> * 如果解构不成功，变量的值就等于undefined。
    let [foo] = [];
    let [bar, foo] = [1];
    以上两种情况都属于解构不成功，foo的值都会等于undefined。
    
    
> * 不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。
    ``` javascript
    let [x, y] = [1, 2, 3];
    x // 1
    y // 2
    let [a, [b], d] = [1, [2, 3], 4];
    a // 1
    b // 2
    d // 4
    ```
    
> * 等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错。
    ``` javascript 
    // 报错
    let [foo] = 1;
    let [foo] = false;
    let [foo] = NaN;
    let [foo] = undefined;
    let [foo] = null;
    let [foo] = {};
    ```
    事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。
    
    
> ### 默认值


> * 解构赋值允许指定默认值。
    ``` javascript
    let [foo = true] = [];
    foo // true
    let [x, y = 'b'] = ['a']; // x='a', y='b'
    let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'  
    ```
    
> * ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。
    ``` javascript
    let [x = 1] = [undefined];
    x // 1
    let [x = 1] = [null];
    x // null
    ```

>* 如果一个数组成员是null，默认值就不会生效，因为null不严格等于undefined。

>* 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
    ```javascript
    function f() {
      console.log('aaa');
    }
    let [x = f()] = [1];
    //因为x能取到值，所以函数f根本不会执行。上面的代码其实等价于下面的代码。
    let x;
    if ([1][0] === undefined) {
      x = f();
    } else {
      x = [1][0];
    }
    ```
    
### 对象的解构赋值

> * 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。  
``` javascript
let { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined
```
> *  如果变量名与属性名不一致，必须写成下面这样。
```javascript
var { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
```
>* 这实际上说明，对象的解构赋值是下面形式的简写（参见《对象的扩展》一章）。
```javascript
let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
//对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
let { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
foo // error: foo is not defined
//foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo。
```

[1, undefined, 3].map((x = 'yes') => x);???

### 字符串的解构赋值 
### 数值和布尔值的解构赋值
### 函数参数的解构赋值

## 字符串
### 1. 字符的unicode表示方法
>"\u0061"
//"a"
###2. codePointAt()
>* codePointAt方法返回的是码点的十进制值
```javascript
var s = '𠮷a';

s.codePointAt(0).toString(16) // "20bb7"
s.codePointAt(2).toString(16) // "61"
//codePointAt方法的参数，是不正确的
var s = '𠮷a';
for (let ch of s) {
  console.log(ch.codePointAt(0).toString(16));
}
// 20bb7
// 61
```
### 3. String.fromCodePoint()
### 4. 字符串的遍历器接口
>ES6为字符串添加了遍历器接口（详见《Iterator》一章），使得字符串可以被for...of循环遍历。
### 5. includes(), startsWith(), endsWith()
> - includes()：返回布尔值，表示是否找到了参数字符串。
- startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
- endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。
```javascript
var s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true
```
### 6. repeat()
>repeat方法返回一个新字符串，表示将原字符串重复n次。
### 7. padStart()，padEnd()
>padStart和padEnd一共接受两个参数，第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串。
```javascript
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
```
### 8. 模板字符串
```javascript
$('#result').append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);
```
>模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。
```javascript
// 普通字符串
`In JavaScript '\n' is a line-feed.`

// 多行字符串
`In JavaScript this is
 not legal.`

console.log(`string text line 1
string text line 2`);

// 字符串中嵌入变量
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`

//大括号内部可以放入任意的JavaScript表达式，可以进行运算，以及引用对象属性
var x = 1;
var y = 2;

`${x} + ${y} = ${x + y}`
// "1 + 2 = 3"

`${x} + ${y * 2} = ${x + y * 2}`
// "1 + 4 = 5"

var obj = {x: 1, y: 2};
`${obj.x + obj.y}`
// 3

//模板字符串之中还能调用函数。
function fn() {
  return "Hello World";
}

`foo ${fn()} bar`
// foo Hello World bar

//模板字符串甚至还能嵌套。

const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;

//标签模板

```
## Number Math
### 1. Number.isFinite(), Number.isNaN()
>Number.isFinite()用来检查一个数值是否为有限的（finite）。
Number.isNaN()用来检查一个值是否为NaN。
### 2. Number.parseInt(), Number.parseFloat()
```javascript
// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45

// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45
```
### 3. Number.isInteger()
>Number.isInteger()用来判断一个值是否为整数。需要注意的是，在 JavaScript 内部，整数和浮点数是同样的储存方法，所以3和3.0被视为同一个值。
```javascript
Number.isInteger(25) // true
Number.isInteger(25.0) // true
Number.isInteger(25.1) // false
Number.isInteger("15") // false
Number.isInteger(true) // false
```
### 4. Number.EPSILON
>引入一个这么小的量的目的，在于为浮点数计算，设置一个误差范围。
### 5. 安全整数和Number.isSafeInteger()
>ES6引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1//true
Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER//true
Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。

### 6. Math.trunc()
>Math.trunc方法用于去除一个数的小数部分，返回整数部分
###7. Math.sign()
>Math.sign方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。
它会返回五种值:
参数为正数，返回+1；
参数为负数，返回-1；
参数为0，返回0；
参数为-0，返回-0;
其他值，返回NaN。
### 8. Math.cbrt()
>Math.cbrt方法用于计算一个数的立方根。
### 9. Math.clz32()
>JavaScript的整数使用32位二进制形式表示，Math.clz32方法返回一个数的32位无符号整数形式有多少个前导0。
```javascript
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1000) // 22
Math.clz32(0b01000000000000000000000000000000) // 1
Math.clz32(0b00100000000000000000000000000000) // 2
```
### 10. Math.imul()
### 11. Math.fround()
### 12. Math.hypot()
>Math.hypot方法返回所有参数的平方和的平方根。Math.hypot(3, 4);  // 5
### 13. Math.signbit()
### 14. Math.signbit()
```javascript
2 ** 2 // 4
2 ** 3 // 8
//指数运算符可以与等号结合，形成一个新的赋值运算符（**=）。

let a = 1.5;
a **= 2;
// 等同于 a = a * a;

let b = 4;
b **= 3;
// 等同于 b = b * b * b;
```
