/**
 * 实现 vue 里的双向绑定
 * Thanks https://zhuanlan.zhihu.com/p/25003235?refer=e-mill
 */


function Lue(options) {
  this._init(options);
}

// init
Lue.prototype._init = function(options) {
  this.$options = options;                              // 传入的实例配置
  this.$el = document.querySelector(options.el);        // 实例绑定的根节点
  this.$data = options.data;                            // 实例的数据域
  this.$methods = options.methods;                      // 实例的函数域


  // 每个成员属性有一个名为_directives的数组，用于在数据更新时触发更新DOM的各directive
  // eg: this._binding={
  //    count:{
  //        _directives:[]          // 该数据对象的相关指令数组
  //    }
  // }
  this._binding = {};

  this._parseData(this.$data);
  this._compile(this.$el);                // 编译DOM节点
};

// use defineProperty to reset set get API
Lue.prototype.convert = function(key, val) {

  var binding = this._binding[key];

  Object.defineProperty(this.$data, key, {
    configurable: true, // default is false
    enumerable: true,   // default is false
    set: function(newVal) {
      console.log('set ', val, ' to ', newVal);
      if (val !== newVal) {
        val = newVal;
        // 遍历该数据对象的directive并依次调用update
        binding._directives.forEach(function(item){
            item.update();
        })
      }
    },
    get: function() {
      console.log('get val => ', val);
      return val;
    }
  })
}


// 遍历数据域，添加getter/setter
Lue.prototype._parseData = function(obj) {
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    this._binding[key] = {        //初始化与DOM绑定的数据对象
        _directives:[]
    };

    if (typeof value === 'object') {
      this._parseData(value);
    }

    this.convert(key, value);
  })
}

// // 遍历 methods 里的所有函数，为其绑定data作用域
// Lue.prototype._parseFunc = function(obj) {
//   if (obj) {
//     Object.keys(obj).forEach((key) => {
//       this.$methods[key] = this.$methods[key].bind(this.$data);
//     });
//   }
// }

// 对绑定的函数进行改造
Lue.prototype._parseFunc = function(attrVal){
   let args = /\(.*\)/.exec(attrVal);
   if(args) {              // 如果函数带参数,将参数字符串转换为参数数组
     args = args[0];
     attrVal = attrVal.replace(args, "");
     args = args.replace(/[\(|\)|\'|\"]/g,'').split(",");
   } else {
     args = [];
   }
   console.log('attrVal => ', attrVal)
   return this.$methods[attrVal].bind(this.$data, args);
};

// 编译带有v-model、v-click与v-bind指令的DOM节点
Lue.prototype._compile = function(root) {

  // 获取指定作用域下的所有子节点
  const nodes = root.children;
  Array.from(nodes).forEach((node, i) => {
    // 若该元素有子节点，则先递归编译其子节点
    if (node.children.length > 0) {
      this._compile(node);
    }

    if(node.hasAttribute("v-click")) {

      node.onclick = (() => {
        let attrVal = node.getAttribute("v-click");
        return this._parseFunc(attrVal);
      })()
    }

    if(node.hasAttribute(("v-model"))
            && (node.tagName == "INPUT" || node.tagName == "TEXTAREA")){
        //如果是input或textarea标签
      node.addEventListener("input", ((key) => {
        const attrVal = node.getAttribute("v-model");
        // 将value值的更新指令添加至_directives数组
        this._binding[attrVal]._directives.push(new Directive(
          "input",
          node,
          this,
          attrVal,
          "value"
        ));

        return () => {
          this.$data[attrVal] = nodes[key].value;
        }
      })(i));
    }

    if(node.hasAttribute("v-bind")){
        const attrVal = node.getAttribute("v-bind");
        // 将innerHTML的更新指令添加至_directives数组
        this._binding[attrVal]._directives.push(new Directive(
          "text",
          node,
          this,
          attrVal,
          "innerHTML"
        ))
    }

  });
}

// Directive的作用就是建立一个DOM节点和对应数据的映射关系
function Directive(name, el, vm, exp, attr) {
    this.name = name;         // 指令名称，例如文本节点，该值设为"text"
    this.el = el;             // 指令对应的DOM元素
    this.vm = vm;             // 指令所属Lue实例
    this.exp = exp;           // 指令对应的值，本例如"count"
    this.attr = attr;         // 绑定的属性值，本例为"innerHTML"

    this.update();          // 首次绑定时更新
}

Directive.prototype.update = function(){
    // 更新DOM节点的预设属性值
    this.el[this.attr] = this.vm.$data[this.exp];
};

// **** use Lue ****

/**
 * <div id="app">
 *    <form>
 *        <input type="text" v-model="count" />
 *        <button type="button" v-click="increment">increment</button>
 *    </form>
 *    <p v-bind="count"></p>
 *  </div>
 */

window.onload = function(){
  const app = new Lue({
    el: '#app',
    data: {
      count: 0,
    },
    methods: {
      increment: function() {
        this.count ++
      },
      alert: function(msg) {
        alert(msg);
      }
    }
  });
}
