// 1
function inherit(Child, Parent) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}
function Base(a) {
    this.a = a;
}
Base.prototype.getA = function() {
    return this.a;
}

function Foo(a, b) {
    Base.call(this, a);
    this.b = b;
}
inherit(Foo, Base);
Foo.prototype.getB = function() {
    return this.b;
}
// 1

var foo = new Foo('aa', 'bb');

console.log(foo.getA());
console.log(foo.getB());