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

### cors
