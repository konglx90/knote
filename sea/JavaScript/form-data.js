// do set by yourself
// xmlHttp.setRequestHeader('Content-type', 'multipart/form-data');
const form = new FormData();
for (const key in paramters) {
    form.append(key, paramters[key]);
}
xmlHttp.send(form);


// Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryBAJemZQBtfnVAHbB
// Content-Type: multipart/form-data;