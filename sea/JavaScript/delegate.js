// function delegate(parent, selector, event, handle) {
//   document.querySelector(parent).addEventListener(event, function(e) {
//
//   });
// }

// ============ 简单的事件委托
function delegateEvent(interfaceEle, selector, type, fn) {

    if(interfaceEle.addEventListener){
    interfaceEle.addEventListener(type, eventfn);
    }else{
    interfaceEle.attachEvent("on"+type, eventfn);
    }

    function eventfn(e){
    var e = e || window.event;
    var target = e.target || e.srcElement;
    //如果目标元素与选择器匹配则执行函数
    if (matchSelector(target, selector)) {
            if(fn) {
 //将fn内部的this指向target（在此之前this都是指向的绑定事件的元素即interfaceEle）
                fn.call(target, e);
            }
        }
    }
}
/**
 * only support #id, tagName, .className
 * and it's simple single, no combination
 */
//比较函数：判断事件的作用目标是否与选择器匹配；匹配则返回true
function matchSelector(ele, selector) {
    // 如果选择器为ID
    if (selector.charAt(0) === "#") {
        return ele.id === selector.slice(1);
    }
      //charAt(0),返回索引为0的字符
    //slice(a，b),从已有的数组或字符串返回从索引从a处开始，截取到索引b之前的子数组或子字符串；
    //如果选择器为Class
    if (selector.charAt(0) === ".") {
        return (" " + ele.className + " ").indexOf(" " + selector.slice(1) + " ") != -1;
    }
    // 如果选择器为tagName
    return ele.tagName.toLowerCase() === selector.toLowerCase();
}
//toLowerCase()将字符串转换成小写
//调用
var odiv = document.getElementById("oDiv");
delegateEvent(odiv,"a","click",function(){
    alert("1");
})
