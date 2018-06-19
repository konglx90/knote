// 模拟 redux 的 next 机制

function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg;
    }

    if (funcs.length === 1) {
        return funcs[0];
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

/**
 * compose(f, g)(...arg)
 * f(g(...arg))
 */

const log1 = next => action => {
    console.log('log1:before', action);
    next(action);
    console.log('log1:after', action);
}

const log2 = next => action => {
    console.log('log2:before', action);
    next(action);
    console.log('log2:after', action);
}

const middlewares = [ log1, log2 ];

const next = compose(...middlewares);

next(next)('do_it');

// --------

// const log1 = action => {
//     console.log('log1', action);
// }

// const log2 = action => {
//     console.log('log2', action);
//     return action;
// }

// const middlewares = [ log1, log2 ];

// const next = compose(...middlewares);

// next('test');
