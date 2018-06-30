
// https://jsperf.com/cloning-an-object/2

// JSON
function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// not support 
// Date
// Array
// 自己定义的对象
// 循环引用
function deepCopy(obj) {
    const newObj = {};
    for (let i in obj) {
        if (typeof obj[i] === 'object' && obj[i] !== null) {
            newObj[i] = deepCopy(obj[i]);
        } else {
            newObj[i] = obj[i];
        }
    }
    return newObj;
}

// not support 循环引用
/**
 *  var a = {}
 *  var b = {}
 *  a['b'] = b
 *  b['a'] = a
 *  deepCopy(a) // Uncaught RangeError: Maximum call stack size exceeded
 *  JSON.stringify(a) // Uncaught TypeError: Converting circular structure to JSON
 */
function deepCopy(obj) {
    if (typeof obj === 'function') {
        return new Function('return ' + obj.toString())
    }

    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }


    let newObj;
    // some obj like Date RegExp
    if (obj instanceof Date) {
        newObj = new Date(obj);
    } else if (obj instanceof RegExp) {
        newObj = new RegExp(obj);
    } else {
        newObj = Array.isArray(obj) ? [] : new obj.constructor();
    }

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepCopy(obj[key]);
        }
    }
    return newObj;
}

// http://yiminghe.iteye.com/blog/1140375
/**
 * 克隆过的对象记录下来
 */
// TODO
const cloned = {};
function deepCopy(obj) {
    if (typeof obj === 'function') {
        return new Function('return ' + obj.toString())
    }

    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    let newObj;
    // some obj like Date RegExp [native code]
    if (obj instanceof Date) {
        newObj = new Date(obj);
    } else if (obj instanceof RegExp) {
        newObj = new RegExp(obj);
    } else {
        newObj = Array.isArray(obj) ? [] : new obj.constructor();
    }

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepCopy(obj[key]);
        }
    }
    return newObj;
}