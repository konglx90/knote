/**
* A easy createStore implement
*/

const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  }

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  }

  // return a default state
  dispatch({});

  return { getState, dispatch, subscribe };
}

// use
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(counter);

const render = () => {
  console.log(store.getState());
}

const unSubCounter = store.subscribe(render);

// unsubscribe in somewhere
// unSubCounter();

for (let i = 0; i < 5; i++) {
  store.dispatch({ type: 'INCREMENT' });
}
