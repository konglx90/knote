## ES5、ES6及The future

请务必在工作中多使用ES6 及未来的新特性

### source

[ES6-babel](https://babeljs.io/learn-es2015/) 新特性的快速了解
[understandinges6](https://leanpub.com/understandinges6/read)

### understandinges6

#### The Temporal Dead Zone

```js
// Temporal Dead Zone
if (condition) {
    console.log(typeof value);  // ReferenceError!
    let value = "blue";
}

// not Temporal Dead Zone
console.log(typeof value);     // "undefined"

if (condition) {
    let value = "blue";
}

```

#### Global Block Bindings

var
```js
// in a browser
var RegExp = "Hello!";
console.log(window.RegExp);     // "Hello!"

var ncz = "Hi!";
console.log(window.ncz);        // "Hi!"

```

let
```js
// in a browser
let RegExp = "Hello!";
console.log(RegExp);                    // "Hello!"
console.log(window.RegExp === RegExp);  // false

const ncz = "Hi!";
console.log(ncz);                       // "Hi!"
console.log("ncz" in window);           //
```


#### The flags Property

ES5
```js
function getFlags(re) {
    var text = re.toString();
    return text.substring(text.lastIndexOf("/") + 1, text.length);
}

// toString() is "/ab/g"
var re = /ab/g;

console.log(getFlags(re));

```

ES6
```js
var re = /ab/g;

console.log(re.source);     // "ab"
console.log(re.flags);      // "

```

#### Multiline Strings the Easy Way

pre-ES6
```js
var value1 = "Multiline bababababababbabbablalalalalaallaal";
var value2 = "value2";
var value3 = "value3";
var value4 = "value4";
var value5 = "value5";
var value6 = "value6";

var message = [
    value1,
    value2,
    value3,
    value4,
    value5,
    value6
].join("");
console.log(message);

```

ES6
```js
// one
const message = `${value1}${value2}${value3}${value4}${value5}${value6}`;

// two
const message = `${value1}${value2}${value3}${
  `${value4}${value5}${value6}`
}`;


```

#### Tagged Templates

TODO

#### Default Parameter Values

```js
function zz(x = 2) {
	console.log('x', x);
}

zz() // => x 2
zz(3) // => x 3
zz(undefined) // => x 2
zz(null) // => x null

```

### Three dots

Rest Parameters
```js
// keys is a array who contains the rest of the parameters passed to the function
function pick(object, ...keys) {
    let result = Object.create(null);

    for (let i = 0, len = keys.length; i < len; i++) {
        result[keys[i]] = object[keys[i]];
    }

    return result;
}

```

Spread Operator
```js
let values = [25, 50, 75, 100]

console.log(Math.max.apply(Math, values));  // 100

// equivalent to
// console.log(Math.max(25, 50, 75, 100));
console.log(Math.max(...values));           // 100

```

#### arrow function

No arguments Binding
```js
function createArrowFunctionReturningFirstArg() {
    return () => arguments[0];
}

var arrowFunction = createArrowFunctionReturningFirstArg(5);

console.log(arrowFunction());       // 5

```

#### Tail Call Optimization

ECMAScript 6 seeks to reduce the size of the call stack for certain tail calls in strict mode (nonstrict mode tail calls are left untouched). With this optimization, instead of creating a new stack frame for a tail call, the current stack frame is cleared and reused so long as the following conditions are met:


```js
"use strict";

function doSomething() {
    // optimized
    return doSomethingElse();
}

"use strict";

function doSomething() {
    // not optimized - no return
    doSomethingElse();
}

"use strict";

function doSomething() {
    // not optimized - must add after returning
    return 1 + doSomethingElse();
}

```

#### Mixins

```js
function mixin(receiver, supplier) {
    Object.keys(supplier).forEach(function(key) {
        receiver[key] = supplier[key];
    });

    return receiver;
}

function EventTarget() { /*...*/ }
EventTarget.prototype = {
    constructor: EventTarget,
    emit: function() { /*...*/ },
    on: function() { /*...*/ }
};

var myObject = {};
mixin(myObject, EventTarget.prototype);

myObject.emit("somethingChanged");
```

```js
function EventTarget() { /*...*/ }
EventTarget.prototype = {
    constructor: EventTarget,
    emit: function() { /*...*/ },
    on: function() { /*...*/ }
}

var myObject = {}
Object.assign(myObject, EventTarget.prototype);

myObject.emit("somethingChanged");
```

#### Object Destructuring

```js
let node = {
        type: "Identifier",
        name: "foo"
    };

let { type: localType, name: localName } = node;

console.log(localType);     // "Identifier"
console.log(localName);     // "foo"

```

#### Swapping variables

```js
// Swapping variables in ECMAScript 6
let a = 1,
    b = 2;

[ a, b ] = [ b, a ];

console.log(a);     // 2
console.log(b);     // 1

```

#### Mixed Destructuring

```js
let node = {
        type: "Identifier",
        name: "foo",
        loc: {
            start: {
                line: 1,
                column: 1
            },
            end: {
                line: 1,
                column: 4
            }
        },
        range: [0, 3]
    };

let {
    loc: { start },
    range: [ startIndex ]
} = node;

console.log(start.line);        // 1
console.log(start.column);      // 1
console.log(startIndex);        // 0

```

#### Symbols

symbol键的设计初衷是避免冲突
[wiki](http://www.infoq.com/cn/articles/es6-in-depth-symbols/)

```js


```

#### Converting a Set to an Array

```js
let set = new Set([1, 2, 3, 3, 3, 4, 5]),
    array = [...set];

console.log(array);             // [1,2,3,4,5]

```

#### Creating Iterables

```js
let collection = {
    items: [],
    *[Symbol.iterator]() {
        for (let item of this.items) {
            yield item;
        }
    }

};

collection.items.push(1);
collection.items.push(2);
collection.items.push(3);

for (let x of collection) {
    console.log(x);
}

```

#### simple async await

```js
function run(taskDef) {

    // create the iterator, make available elsewhere
    let task = taskDef();

    // start the task
    let result = task.next();

    // recursive function to keep calling next()
    function step() {

        // if there's more to do
        if (!result.done) {
            if (typeof result.value === "function") {
                result.value(function(err, data) {
                    if (err) {
                        result = task.throw(err);
                        return;
                    }

                    result = task.next(data);
                    step();
                });
            } else {
                result = task.next(result.value);
                step();
            }

        }
    }

    // start the process
    step();

}

function asyncTask(arg) {
	return callback => {
		setTimeout(() => {
			callback(null, arg);
		}, 1000);
	}
}

run(function*() {
    let contents = yield asyncTask("config.json");
    console.log(contents);
    console.log("Done");
});

```
