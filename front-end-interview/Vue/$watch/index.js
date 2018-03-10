// https://segmentfault.com/a/1190000004384515

class Observer {
  constructor(value) {
    this.value = value
    this.walk(value)
  }
  walk(value) {
    Object.keys(value).forEach(key => this.convert(key,value[key]))
  }
  convert(key, val) {
    defineReactive(this.value, key, val)
  }
}

function defineReactive (obj, key, val) {
  var dep = new Dep()
  var childOb = observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: () => {
      // 证明由Dep引起的
      if(Dep.target){
        dep.addSub(Dep.target)
      }
      return val
    },
    set: newVal => {
      console.log('***set***');
      var value = val
      if (newVal === value) {
        return
      }
      val = newVal
      childOb = observe(newVal)
      dep.notify()
    }
  })
}

function observe (value) {
  if (!value || typeof value !== 'object') {
    return
  }

  return new Observer(value)
}


// 订阅器
class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub){
    this.subs.push(sub)
  }
  notify(){
    this.subs.forEach(sub => sub.update())
  }
}

const dep = new Dep();

// 订阅者
class Watcher {
  constructor(vm, expOrFn, cb) {
    this.cb = cb
    this.vm = vm
    this.expOrFn = expOrFn
    this.value = this.get()
  }
  update(){
    this.run()
  }
  run() {
    const value = this.get()
    if(value !== this.value){
      this.value = value
      this.cb.call(this.vm)
    }
  }
  get() {
    // Dep target set to this means _data getter by target
    Dep.target = this
    const value = this.vm._data[this.expOrFn]
    Dep.target = null
    return value
  }
}

class Vue {
  constructor (options={}) {
    this.$options = options
    let data = this._data = this.$options.data
    Object.keys(data).forEach(key => this._proxy(key))
    observe(data)
  }

  $watch(expOrFn, cb, options) {
    new Watcher(this, expOrFn, cb)
  }

  _proxy(key) {
    var self = this
    Object.defineProperty(self, key, {
      configurable: true,
      enumerable: true,
      get: function proxyGetter () {
        return self._data[key]
      },
      set: function proxySetter (val) {
        self._data[key] = val
      }
    })
  }

}

// *** use ***

const v = new Vue({
  data:{
    a:1,
    b:2
  }
})
v.$watch("a", () => console.log("哈哈，$watch成功"))
setTimeout(()=>{
  v.a = 5
}, 2000) //打印 哈哈，$watch成功
