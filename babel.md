## Babel ES6 to ES5

[babeljs](http://babeljs.io/learn-es2015/#template-strings)

[ES6-ES5](http://babeljs.io/repl/#?babili=false&browsers=&build=&builtIns=false&code_lz=DYUwLgBAZglgRgewHYEMDGaYQLwQN4BQEEA2gMoCeAtosAHQxggBOKYCzAugBQCU-RYhFCQADsxA4IABgA0ENAFdmUgIwBuQcQlhlSAUKFIQADzB8DhoSXEh5SrlJIP5tiAGoFyzpqtCdevgQACbIIABc0CjAAM52EABu0YoRXioAvlpCmYY5EJmZBFAcENxJKvoIUNDwyOiY_ITEAPTNEGDMikhobJJgABaScQCOKd2SbBCq0jOCMNXc-gB8UzPSvFlwEigA1r4KyDEIoHTACADmi7ya6UA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&lineWrap=true&presets=latest%2Creact%2Cstage-2&prettier=true&targets=&version=6.26.0&envVersion=)

### Arrow Function

```js
[1,2,3].map(n => n + 1);

[1, 2, 3].map(function (n) {
  return n + 1;
});
```

### Class

```js
class Foo {
	state = {}
}

// es5
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Foo = function Foo() {
	_classCallCheck(this, Foo);

	this.state = {};
};
```

### Class extend

```js
class Animal {}

class Dog extends Animal {}

const dog = new Dog();

// es5
function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call: self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck(instance, Constructor) {
    if (! (instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Animal = function Animal() {
    _classCallCheck(this, Animal);
};

var Dog = function(_Animal) {
    _inherits(Dog, _Animal);

    function Dog() {
        _classCallCheck(this, Dog);

        return _possibleConstructorReturn(this, (Dog.__proto__ || Object.getPrototypeOf(Dog)).apply(this, arguments));
    }

    return Dog;
} (Animal);

var dog = new Dog();
```

### Create Class

```js
class Foo {
	word = 'hello world'
	hello() {
    	console.log(this.word);
    }
}

// es5
'use strict';

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

var _class, _temp;

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Foo = (_temp = _class = function() {
    function Foo() {
        _classCallCheck(this, Foo);

        this.word = 'hello world';
    }

    _createClass(Foo, [{
        key: 'hello',
        value: function hello() {
            console.log(this.word);
        }
    }]);

    return Foo;
}(), _class.staticWord = 'static hello world', _temp);
```

### Template Strings

```js
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`

// es5
var name = "Bob",
    time = "today";
"Hello " + name + ", how are you " + time + "?";
```

### Destructuring

```js
const [a, ,b] = [1, 2, 3];

// es5
var _ref = [1, 2, 3],
    a = _ref[0],
    b = _ref[2];
```

### Default + Rest + Spread

```js
// default
function foo(x, y=3) {}

// rest
function goo(...args) {
  console.log(args)
}

// spread
const a = [1, 2, 3];
const b = [0, ...a, 4]


// es5
// default
function foo(x) {
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
}

// rest
function goo() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  console.log(args);
}

// spread
var a = [1, 2, 3];
var b = [0].concat(a, [4]);
```

### Let + Const

const 会在编译时期报错

```js
// let
{
	let x = 0;
  	console.log(x);
}

console.log(x);

// es5
{
  var _x = 0;
  console.log(_x);
}

console.log(x);
```

### generator

```js
function *range(n) {
  	const max = n;
	while(n--) {
    	yield max - n
    }
}

// ?
var _marked = /*#__PURE__*/regeneratorRuntime.mark(range);

function range(n) {
   var max;
   return regeneratorRuntime.wrap(function range$(_context) {
      while (1) {
         switch (_context.prev = _context.next) {
            case 0:
               max = n;

            case 1:
               if (!n--) {
                  _context.next = 6;
                  break;
               }

               _context.next = 4;
               return max - n;

            case 4:
               _context.next = 1;
               break;

            case 6:
            case "end":
               return _context.stop();
         }
      }
   }, _marked, this);
}
```

### Iterators + For..Of

```js
let fibonacci = {
  [Symbol.iterator]() {
    let pre = 0, cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { done: false, value: cur }
      }
    }
  }
}

for (var n of fibonacci) {
  // truncate the sequence at 1000
  if (n > 1000)
    break;
  console.log(n);
```