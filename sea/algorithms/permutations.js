function permutations(a, b) {
  const arrA = a.split('');
  const rt = [];
  for (let i = 0; i <= a.length; i++) {
    const arr = [...arrA];
    arr.splice(i, 0, b);
    rt.push(arr.join(''));
  }
  return rt;
}

// permutations('a', 'b')

function PE(str) {

  if (str.length === 1) {
    return [str];
  }

  const bef = PE(str.slice(1));
  let rt = [];
  bef.forEach(b => {
    rt = rt.concat(permutations(b, str[0]))
  });
  return rt;
}

console.log(PE('k'))
console.log(PE('ko'))
console.log(PE('kon'))
console.log(PE('123456'))
