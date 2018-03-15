最后提一句state里应该有什么。这个题目也是有标准答案的，在Interactivity and Dynamic UIs这篇文章。
[wiki](https://shripadk.github.io/react/docs/interactivity-and-dynamic-uis.html)

State里应该包含什么：组件的事件处理函数可能进行修改的，导致UI更新的数据（State should contain data that a component's event handlers may change to trigger a UI update. ）
State里不应该有什么：
计算得出的数据
React组件
从props复制来的数据
