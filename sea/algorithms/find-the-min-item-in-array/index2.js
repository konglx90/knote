function find(arr) {
    let low = 0;
    let high = arr.length - 1;
    let middle = 0;
    while(arr[low] > arr[high]) {
        mid = Math.floor((low + high) / 2)
        if (arr[mid] > arr[high]) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return low;
}

const myArray = [4, 1, 2, 3];

console.log(find(myArray));