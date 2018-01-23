## Cracking the front-end interview

本文旨在指导初级前端的面试

```
#1 必须掌握
#2 应该掌握
#3 值得了解
```

### HTTP 状态码

[wiki](https://httpstatuses.com/)

**#1** 200 302 400 404 500 502

**#2** 101 201 204 304

**#3** 403 405 429

### Promise

[wiki](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch3.md)

**#1** 简单介绍下Promise及相关技术并使用Promise封装ajax

```js
// assume an `ajax( {url}, {callback} )` utility

// Promise-aware ajax
function request(url) {
	return new Promise( function(resolve,reject){
		// the `ajax(..)` callback should be our
		// promise's `resolve(..)` function
		ajax( url, resolve );
	} );
}
```

**#2** 使用Promise.race实现fetch的timeout功能

```js
// a utility for timing out a Promise
function timeoutPromise(delay) {
	return new Promise( function(resolve,reject){
		setTimeout( function(){
			reject( "Timeout!" );
		}, delay );
	} );
}

Promise.race( [timeoutPromise(3000), fetch('http://www.kuaizhan.com')] )
.then( function(msg){
  console.log(msg);
} )
.catch( function(error){
	console.log( error );
} );

```

**#3** 实现Promise.map 并探讨其应用场景

```js
if (!Promise.map) {
	Promise.map = function(vals,cb) {
		// new promise that waits for all mapped promises
		return Promise.all(
			// note: regular array `map(..)`, turns
			// the array of values into an array of
			// promises
			vals.map( function(val){
				// replace `val` with a new promise that
				// resolves after `val` is async mapped
				return new Promise( function(resolve){
					cb( val, resolve );
				} );
			} )
		);
	};
}

var p1 = Promise.resolve( 21 );
var p2 = Promise.resolve( 42 );
var p3 = Promise.reject( "Oops" );

// double values in list even if they're in
// Promises
Promise.map( [p1,p2,p3], function(pr,done){
	// make sure the item itself is a Promise
	Promise.resolve( pr )
	.then(
		// extract value as `v`
		function(v){
			// map fulfillment `v` to new value
			done( v * 2 );
		},
		// or, map to promise rejection message
		done
	);
} )
.then( function(vals){
	console.log( vals );	// [42,84,"Oops"]
} );

```

### CORS

[wiki](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)

**#1** 什么是浏览器的同源策略

[wiki](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)

同源策略限制从一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的关键的安全机制。

**#2** CORS 的使用场景

- 由 XMLHttpRequest 或 Fetch 发起的跨域 HTTP 请求。
- Web 字体 (CSS 中通过 @font-face 使用跨域字体资源), 因此，网站就可以发布 TrueType 字体资源，并只允许已授权网站进行跨站调用。
- WebGL 贴图
- 使用 drawImage 将 Images/video 画面绘制到 canvas
- 样式表（使用 CSSOM)

**#3** 发起预检请求的条件

[wiki](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)

### About Array

[wiki](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

**#1** 指出几个操作符合纯函数定义的Array API

- slice
- concat
- indexOf

**#2** 使用wiki或者可以不用 实现不依赖Array API的栈操作

```js
const arr = [];
const push = (a, x) => {
	a[a.length] = x;
}
const pop = (a, x) => {
	const r = a[a.length-1];
	a.length = a.length - 1;
	return r;
}

push(arr, 1);
pop(arr); // 1

```

**#3** 偏算法题

有数组形如[0, 0, 1, 2, 3, 3...], 数组里的元素关系满足

```js
[value, ...];
When index is 0 value is 0;
value 一定是非负整数;
且一定满足一下式子:
Array[index] <= Array[index+1];
Array[index] + 1 >= Array[index+1];
Array[index] + 2 > Array[index+1];
```

为数组瘦身,
记录下每个不一样的数的起点的index;

```js
/*
[0, 0, 1, 2, 3, 3] =>
[0, 2, 3, 4]
*/
const reduceArray = starts => {
    if (starts.length === 0) return [];
    return starts.reduce((obj, y, index) => {
    	let ret = {};
    	if (obj.lastValue !== y) {
			ret.values = obj.values.concat(index);
    	} else {
			ret.values = obj.values;
		}
    	ret.lastValue = y;
    	return ret;
    }, {lastValue: 0, values: [0]}).values;
}

const starts = [0, 0, 1, 2, 3, 3];
const ends = reduceArray(starts);

```

### 正则表达式

**#1**
