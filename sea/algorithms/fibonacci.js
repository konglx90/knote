function fibonacci(n) {
  const result = [0, 1];
  if (n <= 2) {
    return result[n-1];
  }

  return fibonacci(n-1) + fibonacci(n-2);
}

function fibonacci1(n) {
  const result = [0, 1];
  if (n <= 2) {
    return result[n-1];
  }

  let first = 0;
  let second = 1;
  for(let i=3; i<=n; i++) {
    let s = second;
    second = first + second;
    first = s;
  }

  console.log(second, 'xxx');
}

fibonacci1(8)

console.log(fibonacci(8));
