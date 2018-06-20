// http://demo.nimius.net/debounce_throttle/

function ajax(e) {
    console.log(e);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('send ajax');
            return resolve({ code: 200 });
        }, 1000);
    })
}

function debounce(fn, delay) {
    let timer;
    return function() {
        if (timer) clearTimeout(timer);
        
        const args = arguments;
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    }
}

$('body').addEventListener('click', debounce(ajax, 500))


