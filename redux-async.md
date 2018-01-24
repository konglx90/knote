```js
export const actRequestNeedLogin = (data) => (dispatch, getState) => {
    const {
        fetch,
        callback,
        failCallback,
        finallyClear,
    } = data;

    fetch().then(data => {
        if (data.code === 401) {
            dispatch(actShowLogin({show: true}));
            isFunction(failCallback) && failCallback(data);
        } else if (data.code === 200) {
            isFunction(callback) && callback(data);
        } else {
            const msg = data.msg || '网络异常';
            dispatch(actShowToast({message: msg}));
            isFunction(failCallback) && failCallback(data);
        }
    }).catch(error => {
        dispatch(actShowToast({ message: error.message || '网络异常' }))
    }).finally(() => {
        isFunction(finallyClear) && finallyClear();
    })
}

dispatch(actRequestNeedLogin({
    fetch: () => {
        return reportRentUnit(rentUnitId, reportType, msg);
    },
    callback: (data) => {
        dispatch(actShowToast({ message: '举报成功' }));
        dispatch(actShowLastPage({}));
    },
    finallyClear: () => {
        this.setState({
            reportMsg: '',
            loading: false,
        })
    }
}));
```

```js
export const actRequestNeedLogin = (fetch, ...payload) => (dispatch, getState) => {
    if (typeof fetch !== 'function') {
        throw new Error('[actRequestNeedLogin] fetch must be function ');
    }

    return new Promise((resolve, reject) => {
       fetch(...payload).then(data => {
            if (data.code === 401) {
                dispatch(actShowLogin({show: true}));
                reject(data);
            } else if (data.code === 200) {
                resolve(data);
            } else {
                const msg = data.msg || '网络异常';
                dispatch(actShowToast({message: msg}));
                reject(data);
            }
        }).catch(error => {
            dispatch(actShowToast({ message: error.message || '网络异常' }))
        });
    });
}

dispatch(actRequestNeedLogin(reportRentUnit, rentUnitId, reportType, msg))
    .then((data) => {
        dispatch(actShowToast({ message: '举报成功' }));
        dispatch(actShowLastPage({}));
    }).finally(() => {
        this.setState({
            reportMsg: '',
            loading: false,
        })
    })
```
