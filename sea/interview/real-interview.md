### [一年-头条](https://github.com/xuqinggang/blog/blob/master/%E9%9D%A2%E8%AF%95/2018.05.30-%E5%A4%B4%E6%9D%A1.md)

---

#### CSS 布局题

   TODO

#### 路径简化

unix路径简化。输入: `/a/./b/../../c/`，输出: `/c`

<details>
<summary>Answer</summary>

   利用栈实现

   1. split by `'/'`
   2. four type `'.'` `'..'` `''` 'a'
   3. stack
   4. easy because start with '/' `/../../ ==> /`

   ```js
   function simplifyUnixPath(path) {
       const pathArray = path.split('/');
       const usefulPath = [];
       // TODO forEach to for
       pathArray.forEach(src => {
           if (src === '..') {
               usefulPath.pop();
           }
           if (src !== '' && src !== '.' &&  src !== '..') {
               usefulPath.push(src);
           }
       });
       return '/' + usefulPath.join('/');
   }
   ```
</details>

#### 简单路由

实现一个简单的路由，支持前进和后退，并且url变化

```js
router.on('/:id', function(params) {
  console.log(params.id);
});
router.on('/:user/:id', function(params) {
  console.log(params.id, params.user);
});

router.go('/12345');
router.go('/foo/12345');
router.back();
```

<details>
<summary>Answer</summary>

```js
class Router {

  constructor() {
    this.paths = new Set();
    this.handlers = {}; // key: []
    this.history = [];
  }

  _pushPath(path) {
    this.paths.add(path);
  }

  _pushHandlers(path, callback) {
    if (this.handlers[path]) {
      this.handlers[path].push(callback);
    } else {
      this.handlers[path] = [callback];
    }
  }

  _isMatchPathPart(pathPart, realPathPart) {
    if (pathPart.startsWith(':')) return {
      [pathPart.slice(1)]: realPathPart,
    };
    if (pathPart === realPathPart) return true;

    return false;
  }

  _isMatch(path, realPath) {
    const pathArray = this._parsePath(path);
    const realPathArray = this._pathRealPath(realPath);

    if (pathArray.length !== realPathArray.length) {
      return false;
    }

    let params = {};
    let match = true;
    for (let index in pathArray) {
      const _match = this._isMatchPathPart(pathArray[index], realPathArray[index]);
      if (!_match) {
        match = false;
        break;
      }

      if (_match.constructor.name === 'Object') {
        params = Object.assign({}, params, _match);
      }
    }

    return {
      match,
      params,
    };
  }

  _parsePath(path) {
    const _path = this._standardize(path);
    const pathArray = _path.split('/').slice(1, -1);
    return pathArray;
  }

  _pathRealPath(realPath) {
    return this._parsePath(realPath);
  }

  _standardize(path) {
    return path.endsWith('/') ? path : `${path}/`
  }

  on(path, callback) {
    this._pushPath(path);
    this._pushHandlers(path, callback);
  }

  go(realPath, isBack = false) {
    const paths = Array.from(this.paths);

    let matchedPaths = [];
    for (let path of paths) {
      const match = this._isMatch(path, realPath)
      if (match.match) {
        matchedPaths.push({
          path,
          params: match.params,
        });
      }
    }

    matchedPaths.forEach((matchedPath) => {
      const handlers = this.handlers[matchedPath.path];
      handlers.forEach(handler => {
        handler(matchedPath.params);
        if (!isBack) {
          this.history.push(realPath);
        }
      });
    })
  }

  back() {
    const backPath = this.history.pop();
    if (backPath) {
      this.go(backPath, true);
    }
  }
}

const router = new Router();

router.on('/xxx/:id', (params) => {
  console.log('params', params);
})

router.on('/:id', (params) => {
  console.log('params', params);
})

router.go('/foo');
router.go('/foo/zz');
router.back();
router.back();
```

</details>

#### 如何判断是不是数组?

<details>
<summary>Answer</summary>

```js
const myArray = [];

typeof myArray === 'object' && a.slice;

myArray instanceof [];

Object.prototype.toString.call(myArray) === '[object Array]';

Array.isArray(myArray);
```

</details>

#### arguments类数组，如何转换为数组

<details>
<summary>Answer</summary>

```js
Array.prototype.slice.call(arguments)

Array.from(arguments);
```

</details>

#### new

通过一个构造函数，new 创建一个对象发生了什么？new创建的对象的原型是什么？

<details>
<summary>Answer</summary>

```js
function Foo() {
  this.name = 'foo';
};

const f = new Foo();

function Bar() {
  const obj = Object.create(Bar.prototype);
  obj.name = 'bar';
  return obj;
};

const b = Bar();
```

</details>

#### 浏览器缓存，协议级别的缓存，简单说下

TODO
http://www.cnblogs.com/vajoy/p/5341664.html

https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html

expire cache-control etag

#### 算法

一个有序的数组如何在O(n)时间复杂度，找出两个数之和为给定数的问题

<details>
<summary>Answer</summary>

```js

const myArray = [1, 2, 3, 4, 5, 6, 56, 89, 100];

function findSum(target, arr) {
  if (arr.length <= 1) return false;

  let startIndex = 0;
  let lastIndex = arr.length - 1;
  let flag = false;
  while (startIndex !== lastIndex) {
    const addNum = arr[startIndex] + arr[lastIndex];
    if (addNum === target){
      flag = true;
      break;
    }

    if (addNum > target) {
      lastIndex --;
    }

    if (addNum < target) {
      startIndex ++;
    }
  }

  return flag ? [ arr[startIndex], arr[lastIndex] ] : false;
}

console.log(findSum(62, myArray));
console.log(findSum(62, []));
console.log(findSum(62, [2]));
console.log(findSum(62, [6, 56]));

```

</details>

#### xhr实现ajax请求?

<details>
<summary>Answer</summary>

```js
var http = new XMLHttpRequest();
http.open('GET', '/foo');
http.send();

// or high API onload
http.onreadystatechange = function () {
  console.log(http.readyState);
  console.log(http.status);
  console.log(http.responseText);
}
```

</details>

#### form表单提交和h5提供的formData，有何区别

TODO

[资料](https://www.cnblogs.com/lyr1213/p/6238026.html)

#### ajax请求一个图片，如何实现？

<details>
<summary>Answer</summary>

```js
// https://blog.csdn.net/qq_29287973/article/details/78355558
var xmlhttp;
xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET', 'https://pic.nanguazufang.cn/g3/0c/fa/6c61-eb79-4e50-b9f3-bdf812ef58f645', true);
xmlhttp.responseType = 'blob';
xmlhttp.onload = function() {
    if (this.status == 200) {
        var blob = this.response;
        var img = document.createElement("img");
        img.onload = function(e) {
            window.URL.revokeObjectURL(img.src);
        };
        img.src = window.URL.createObjectURL(blob);
        document.body.appendChild(img);
    }
}
xmlhttp.send();
```

镜像题: 如何使用ajax上传图片(TODO)

```js
// display:none input
<input
    type="file"
    name="file"
    accept="image/gif,image/jpeg,image/jpg,image/png"
    style="display:none"
    multiple="multiple"
    ref="imginput"
    @change="uploadHandler">

```

</details>

#### 实现一个react tab组件

<details>
<summary>Answer</summary>

```js
// https://blog.csdn.net/u013558749/article/details/68231773

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = { current: 0 };
  }

  render() {
    const { children } = this.props;
    const { current } = this.state;
    return (
      <ul>
        {
          children.map((element, index) => {
            <li class={current === index && 'item-show'} onClick={ () => this.setState({ current: index }) }>{ element.props.name }</li>
          });
        }
      </ul>
      <ul>
        {
          children.map((element, index) => {
            <li>{ element }</li>
          });
        }
      </ul>
    )
  }

}

```

</details>

#### 实现一个简单的类似redux中间件通过next机制执行
