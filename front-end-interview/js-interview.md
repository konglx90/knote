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

### ES6

**#1** 举例说明rest和spread的用法

```js
// rest
function pick(object, ...keys) {
    let result = Object.create(null);

    for (let i = 0, len = keys.length; i < len; i++) {
        result[keys[i]] = object[keys[i]];
    }

    return result;
}

// Spread
let values = [25, 50, 75, 100]

console.log(Math.max.apply(Math, values));  // 100

// equivalent to
// console.log(Math.max(25, 50, 75, 100));
console.log(Math.max(...values));           // 100
```

**#2** Destructuring

使用 Destructuring 语法，在指定位置添加合适代码，运行结果正确
```js
const x = {
	y: {
		z: 9
	}
};

// code here
const {y: {z: cool}} = x;

console.log(cool); // => 9

```

**#3** 查看MDN Proxy文档实现下列功能

[wiki](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
```js
var tree = Tree();
tree.branch1.branch2.twig = "green";
// tree => { branch1: { branch2: { twig: "green" } } }
tree.branch1.branch3.twig = "yellow";
// tree => { branch1: { branch2: { twig: "green" }, branch3: { twig: "yellow" }}}

// answer
function Tree() {
	return new Proxy({}, handler);
}
var handler = {
	get: function (target, key, receiver) {
		if (!(key in target)) {
			target[key] = Tree();  // 自动创建一个子树
		}
		return Reflect.get(target, key, receiver);
	}
};

```

### reduce

**#1** 使用reduce得出数组中最大的数字

手写加分，也可以用chrome dev tools 调试出来

```js  
var ratings = [2,3,1,4,5]; // => 5
ratings.reduce((acc, curr) => acc > curr ? acc : curr);

```

**#2** 实现简单的compose

```js
// 这个只能处理单参数
// 能使用 reduceRight 实现最好，也可以用其他方式实现
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

// 菜菜的实现
const compose = (...funcs) => {
	let r;
	return (x) => {
		funcs.reverse().forEach((func,index)=>{
			if (index === 0) {
				r = func(x);
			} else {
				r = func(r);
			}
        })
		return r;
	}
}

// Redux 版
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  const last = funcs[funcs.length - 1]
  const rest = funcs.slice(0, -1)
  return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args))
}
```

**#2.1** 题外话

问实现过redux的中间件吗？实现过什么功能?

**#3** 已知一种reduce的实现，请用该reduce实现filter

```js
filter(x > 0, [0, 1, -1]); // => [1]
```


```js
const reduce = (reducer, initial, arr) => {
  let acc = initial;
  for (let i = 0, length = arr.length; i < length; i++) {
    acc = reducer(acc, arr[i], i);  // have index
  }
  return acc;
};

reduce((acc, curr) => acc + curr, 0, [1,2,3]); // 6

const filter = (
 fn, arr
) => reduce((acc, curr) => fn(curr) ?
 acc.concat([curr]) :
 acc, [], arr
);
```

```js
const mapReducer = (mapper) => (result, input) => {
  return result.concat(mapper(input));
};
const filterReducer (predicate) => (result, input) => {
  return predicate(input) ? result.concat(input) : result;
};
const personRequirements = (person) => ageAbove18(person)
  && isFemale(person)
  && livesInTheNetherlands(person);
const output = bigCollectionOfData
  .reduce(filterReducer(personRequirements), [])
  .reduce(mapReducer(pickFullName), []);
```

### 正则表达式

[wiki](https://github.com/zeeshanu/learn-regex/blob/master/README-cn.md)

**#1** 按要求匹配出相应的字符串

```js
// numbers
const str = 'My phone is 17866668888';
const str = 'My phone is 17868989899';
const str = 'My phone is 18789894991';
```

```js
const re = /17866668888|17868989899|18789894991/;
const re = /[0-9]{11}/;
const re = /\d+/;
```

**#2** 将下列字符串转化成相应字符串

```js

```
