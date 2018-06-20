var data = null
function reset(){
    var oldData=data;//关联节点，指向上一次作用域的对象
    function idle(){
        console.log(oldData)//引用外部oldData生成闭包
    }
    //引用了全局变量，为函数上下文关联创造条件
    data={
        raw: new Array(1000000).join('!'),
        opt: function(x){
            console.log(x)//闭包共享，关联到oldData
        }
    }
}
setInterval(reset, 1000);
