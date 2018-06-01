// count(a, b)(c, d)(c, d, e) => 'a b c d c d e'

const count = (...args) => {
  let r = args.join(' ');
  const fun = (...args) => {
    r = `${r} ${args.join(' ')}`
    return fun;
  }
  fun.toString = () => {
    return r;
  }
  return fun;
}
