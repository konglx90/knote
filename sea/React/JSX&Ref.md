1. JSX just provides syntactic sugar for the React.createElement

```js
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>

// compiles

React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)

```

2. Props Default to “True”

```js
<MyTextBox autocomplete />

// equivalent

<MyTextBox autocomplete={true} />

```

3. A React component can also return an array of elements:

```js
render() {
  // No need to wrap list items in an extra element!
  return [
    // Don't forget the keys :)
    <li key="A">First item</li>,
    <li key="B">Second item</li>,
    <li key="C">Third item</li>,
  ];
}

```

4. props.children as a function

```js
// Calls the children callback numTimes to produce a repeated component
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}

```


5. false, null, undefined, and true are valid children. They simply don’t render.

```js
<div>
  {showHeader ? <Header /> : null}
  <Content />
</div>

// can change to

<div>
  {showHeader && <Header />}
  <Content />
</div>

```


6. Adding a Ref to a Class Component

```js
// Note that this only works if CustomTextInput is declared as a class, not a functional component
class AutoFocusTextInput extends React.Component {
  componentDidMount() {
    this.textInput.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput
        ref={(input) => { this.textInput = input; }} />
    );
  }
}

```

7. Refs and Functional Components not work

```js
function MyFunctionalComponent() {
  return <input />;
}

class Parent extends React.Component {
  render() {
    // This will *not* work!
    return (
      <MyFunctionalComponent
        ref={(input) => { this.textInput = input; }} />
    );
  }
}

```

8. use the ref attribute inside a functional component

```js
function CustomTextInput(props) {
  // textInput must be declared here so the ref callback can refer to it
  let textInput = null;

  function handleClick() {
    textInput.focus();
  }

  return (
    <div>
      <input
        type="text"
        // you will get a DOM element in native tag, like input div...
        ref={(input) => { textInput = input; }} />
      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );  
}

```

8. Legacy API: String Refs

[issues](https://github.com/facebook/react/pull/8333#issuecomment-271648615)

If you worked with React before, you might be familiar with an older API where the ref attribute is a string, like "textInput", and the DOM node is accessed as this.refs.textInput. We advise against it because string refs have some issues, are considered legacy, and are likely to be removed in one of the future releases. If you’re currently using this.refs.textInput to access refs, we recommend the callback pattern instead.
