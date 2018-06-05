### 因为类方法不会自动绑定 this 到实例上

```js
class ExplainBindingsComponent extends Component {
    onClickMe() {
        console.log(this); // undefined
    }
    render() {
        return (
            <button
                onClick={this.onClickMe}
                type="button"
            >
                Click Me
            </button>
        );
    }
}
```

### What's the problem with PureComponents?
If "children" (or any other prop) is a React element or an array, it will send a new instance every time. This means that in most cases, the following check will always be true:

this.props.children !== nextProps.children


###  注意 `commentStorage.get()` 的位置

```js 
export default function CommentCardWrap(WrappedComponent) {
    // const data = commentStorage.get();
    return (props) => {
        const data = commentStorage.get();
        return (
            <WrappedComponent {...props} {...data} />
        );
    };
}
```