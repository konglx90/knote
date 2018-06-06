const middlewares = [];

const log = (data, next) => {
  console.log(data);
  next();
}

middlewares.push(log);
middlewares.push(log);

function run() {
  const state = {};
  const action = '';

  let i = 0;
  function next() {
    i = i + 1;
  };

  let beforeI = -1;
  while(i < middlewares.length) {
    if (beforeI !== i) {
      beforeI = i;
      middlewares[i]({
        state,
        action,
      }, next);
    } else {
      break;
    }
  }
}

run();
