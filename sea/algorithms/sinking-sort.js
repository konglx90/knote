let myArray = [2, 4, 1, 9, 4, 6];

function sinkingSort(a) {
  for (let i=0; i<a.length; i++) {
    for (let j=i+1; j<a.length; j++) {
      if (a[j] > a[i]) {
        let temp = a[i];
        a[i] = a[j];
        a[j] = temp;
      }
    }
  }
  return a;
}

console.log(sinkingSort(myArray));
