// https://segmentfault.com/a/1190000009809466

var p = new MyPromise((resolve) => {
    setTimeout(() => {
        resolve(20)
    }, 300)
})
p.then( (msg) => console.log(msg) );

// promise
// 发布 订阅

const PENDING = 0;
const RESOLVED = 1;
const REJECTED = 2;
function MyPromise(func){
    let state = PENDING;
    let value = null;
    let handlers = [];
    function resolve(newValue){
        value = newValue;
        state = RESOLVED;
        handlers.forEach(handler => handle(handler));
    }
    function reject(err) {
        value = err;
        state = REJECTED;
    }
    function handle(handler) {
        if(state === PENDING) {
            handlers.push(handler);
            return;
        }
        console.log(handlers);
        handler.resolve(handler.onFullFill(value));
    }
    this.then = function(onFullFill, onReject){
        console.log('call then');
        // 返回新的 promise 对象
        return new MyPromise((_resolve, _reject) => {
            handle({
                resolve: _resolve,
                onFullFill: onFullFill
            })
        })
    }
    func(resolve, reject);
}