let myArray = [2, 4, 1, 9, 4, 6];

function insertionSort(a) {
  if (a.length <= 1) return a;
  for (let i=1; i < a.length; i++) {
    let j = i - 1;
    let temp = a[i];
    while (j >= 0 && a[j] > temp) {
      a[j + 1] = a[j];
      j--;
    }
    a[j + 1] = temp;
  }
  return a;
}

console.log(insertionSort(myArray));
