// 函数级作用域
var x = () => ({
	set: () => { console.log('set') },
	get: () => { console.log('get') },
	push: () => { console.log('push', this) }
});

var ex = x();

ex.push(); // this => window

// -------

var y = () => {
    var r = {};
    r = {
        set: () => { console.log('set') },
        get: () => { console.log('get') },
        push: () => { console.log('push', r) }
    }
    return r;
};

var ey = y();

ey.push(); // r => r

// --------

var z = () => ({
    set: () => { console.log('set') },
    get: () => { console.log('get') },
    push: function() { console.log('push', this) }
});

var ez = z();

ez.push(); // this => {set get push}

