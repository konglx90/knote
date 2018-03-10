### 考察setState的使用和实现

**#1** 以下输出及原因

```js
class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  componentDidMount() {
    let me = this;
    me.setState({
      count: me.state.count + 1
    });
    console.log(me.state.count);    // 打印
    me.setState({
      count: me.state.count + 1
    });
    console.log(me.state.count);    // 打印
    setTimeout(function(){
     me.setState({
       count: me.state.count + 1
     });
     console.log(me.state.count);   // 打印
    }, 0);
    setTimeout(function(){
     me.setState({
       count: me.state.count + 1
     });
     console.log(me.state.count);   // 打印
    }, 0);
  }
  render() {
    return (
      <h1>{this.state.count}</h1>
    )
  }
}
```
