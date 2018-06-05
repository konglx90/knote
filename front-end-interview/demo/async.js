```js
const sleep = (time = 2000) => {
    return new Promise((resolve,reject)=>{
      setTimeout(() => {
          resolve(true);
          console.log('sleep ok');
      }, time)
    })
  }
const tasks = [sleep(2000), sleep(2000)];
Promise.all(tasks).then((data) => {
	console.log(data);
})
```