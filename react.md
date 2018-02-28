### React

1. 严格来讲，React 是专注与View的库

2. App <=> Virtual DOM <=> DOM

性能和跨平台

3. 函数式

- 减少冗余代码(命令式与声明式的比较)
- 易于测试(单元测试)

4. JSX 不是必须选项，但绝对是个绝佳选项

5. React: every thing in JS, JS 是久经考验并不断发展的编程语言，相对于Vue一种相对封闭的环境更加灵活

6. 使用react快速设计一个tabs组件, 主要结构、主要方法、关键样式实现

7. react 的生命周期

8. 多使用组合而不是继承去实现组件(HAS-A与IS-A的区别)

9. setState 到底干了什么?

10. 使用shouldComponentUpdate一定要考虑清楚所有的prop state

11. 无状态组件每次都会重新渲染

Recompose里的[pure](https://github.com/acdlite/recompose/blob/master/src/packages/recompose/pure.js#L3:31)方法

const OptimizedComponent = pure(ExpensiveComponent);
