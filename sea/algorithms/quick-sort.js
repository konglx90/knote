// https://juejin.im/post/5b06ba5051882538953ac7e5

let myArray = [2, 4, 1, 9, 4, 6];

function quickSort(a) {
  if (a.length <= 1) return a;
  const p = a[0];
  return [
    ...quickSort(a.slice(1).filter(i => i <= p)),
    p,
    ...quickSort(a.slice(1).filter(i => i > p)),
  ]
}

quickSort(myArray);

function quickSort(arr) {
    let left = 0,
        right = arr.length - 1;
    //console.time('QuickSort');
    main(arr, left, right);
    //console.timeEnd('QuickSort');
    return arr;
    function main(arr, left, right) {
        // 递归结束的条件，直到数组只包含一个元素。
        if(arr.length === 1) {
            // 由于是直接修改arr，所以不用返回值。
            return;
        }
        // 获取left指针，准备下一轮分解。
        let index = partition(arr, left, right);
        if(left < index - 1) {
            // 继续分解左边数组。
            main(arr, left, index - 1);
        }
        if(index < right) {
            // 分解右边数组。
            main(arr, index, right);
        }
    }
    // 数组分解函数。
    function partition(arr, left, right) {
        // 选取中间项为参考点。
        let pivot = arr[Math.floor((left + right) / 2)];
        // 循环直到left > right。
        while(left <= right) {
            // 持续右移左指针直到其值不小于pivot。
            while(arr[left] < pivot) {
                left++;
            }
            // 持续左移右指针直到其值不大于pivot。
            while(arr[right] > pivot) {
                right--;
            }
            // 此时左指针的值不小于pivot，右指针的值不大于pivot。
            // 如果left仍然不大于right。
            if(left <= right) {
                // 交换两者的值，使得不大于pivot的值在其左侧，不小于pivot的值在其右侧。
                [arr[left], arr[right]] = [arr[right], arr[left]];
                // 左指针右移，右指针左移准备开始下一轮，防止arr[left]和arr[right]都等于pivot然后导致死循环。
                left++;
                right--;
            }
        }
        // 返回左指针作为下一轮分解的依据。
        return left;
    }
}
