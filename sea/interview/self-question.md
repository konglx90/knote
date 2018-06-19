### formData

```js
if (opts.formData) {
    // _fetchOpts.headers['Content-Type'] = 'multipart/form-data';
    var form = new FormData();
    for (var key of opts.formData) {
        form.append(key, opts.formData[key]);
    }
    _fetchOpts.body = form;
}
```
