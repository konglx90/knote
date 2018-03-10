1. js 统计一个字符串出现频率最高的字母/数字

```js
// Way1

const countMax = (str) => {
  const count = {};
  str.split('').forEach((s, i) => {
    if (count[s]) {
      count[s] += 1;
    } else {
      count[s] = 1;
    }
  });
  const maxCount = Math.max(...Object.values(count));
  Object.keys(count).forEach((s, i) => {
    if (maxCount === count[s]) {
      console.log(s);
    }
  })
}

```

2. 数组去重

```js

// Way1
const unique = (arr) => {
    return Array.from(new Set(arr));
}

```

3. 翻转字符串

```js
const reverseString = (str) => {
  return [...str].reverse().join('');
}

```

4. 数组中最大差值

```js
const difference = (arr) => {
  return Math.max(...arr) - Math.min(...arr);
}

```
