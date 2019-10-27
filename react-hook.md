## useFetch

```js
const useFetch = url => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(async () => {
    const response = await fetch(url);
    const data = await response.json();
    const [item] = data.results;
    setData(item);
    setLoading(false);
  }, []);

  return { data, loading };
};
```

## Switch

```js
class Switch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            on: props.initialState || false,
        };
    }
    toggle() {
        this.setState({
            on: !this.state.on,
        });
    }
    render() {
        return (
            <div>{this.props.children({
                on,
                toggle: this.toggle,
            })}</div>
        );
    }
}
// how to use
const App = () => (
    <Switch initialState={false}>{({on, toggle}) => {
        <Button onClick={toggle}>Show Modal</Button>
        <Modal visible={on} onSure={toggle}></Modal>
    }}</Switch>
);
// use hooks
const App = () => {
    const [on, setOn] = useState(false);
    return (
        <div>
            <Button onClick={() => setOn(true)}>Show Modal</Button>
            <Modal visible={on} onSure={() => setOn(false)}></Modal>
        </div>
    );
}

// 作者：大板栗
// 链接：https://juejin.im/post/5c9d7485e51d451ba13d9a93
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

## useFetchShop
```js
function useFetchShop(shopId) {
  const [shop, setShop] = useState({});
  async function fetchShopDetail(shopId) {
    const shop = await ShopAPI.getShop(shopId);
    setShop(shop);
  }
  useEffect(() => {
    fetchShopDetail(0);
  }, [shopId]);
  return shop;
}
```