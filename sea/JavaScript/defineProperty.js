// (1) define someOne property name
someOne.name = 'cover';
//or use (2)
someOne['name'] = 'cover';
// or use (3) defineProperty
Object.defineProperty(someOne, 'name', {
    value : 'cover'
});


//加入有一个目标节点， 我们想设置其位移时是这样的
var targetDom = document.getElementById('target');
var transformText = 'translateX(' + 10 + 'px)';
targetDom.style.webkitTransform = transformText;
targetDom.style.transform = transformText;


//这里只是简单设置下translateX的属性，其他如scale等属性可自己去尝试

Object.defineProperty(dom, 'translateX', {
set: function(value) {
         var transformText = 'translateX(' + value + 'px)';
        dom.style.webkitTransform = transformText;
        dom.style.transform = transformText;
}
//这样再后面调用的时候, 十分简单
dom.translateX = 10;
dom.translateX = -10;
//甚至可以拓展设置如scale, originX, translateZ,等各个属性，达到下面的效果
dom.scale = 1.5;  //放大1.5倍
dom.originX = 5;  //设置中心点X
}
