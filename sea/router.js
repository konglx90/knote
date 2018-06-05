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

router.go('/xxx');
router.go('/xxx/zz');
router.back();
router.back();
