function bind(func, context) {
	return function(...args) {
		func.call(context, ...args);
	}
}

function example() {
  console.log(this)
}
const boundExample = bind(example, { a: true })
boundExample.call({ b: true }) // logs { a: true }
