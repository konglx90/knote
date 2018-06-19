function instanceOf(leftObj, rightFunc) {
  var left = Object.getPrototypeOf(leftObj);
  var isIn = false;
  while (left) {
    if (left === rightFunc.prototype) { isIn = true; break; }
    left = Object.getPrototypeOf(left);
  }
  return isIn;
}

// 测试用例

function Foo() {}
var f = new Foo();

function Bar() {};
Bar.prototype = Object.create(Foo.prototype);
var a = new Bar();

console.log(instanceOf(f, Foo));
console.log(instanceOf(a, Foo));
