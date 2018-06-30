const memoize = fn => {
  const cache = new Map()
  return value => {
    const cachedResult = cache.get(value)
    console.log(cachedResult, 'cachedResult');
    if (cachedResult !== undefined) return cachedResult
    const result = fn(value)
    cache.set(value, result)
    return result
  }
}

function fibonacci(n) {
	if (n <= 1) return n;
	return fibonacci(n-1) + fibonacci(n-2);
}
const startTime = new Date().getTime();
const a = memoize(fibonacci);
console.log(a(40));
console.log(a(40));
// console.log(fibonacci(40));
console.log(new Date().getTime() - startTime);

// memoize(fibonacci)(30);
