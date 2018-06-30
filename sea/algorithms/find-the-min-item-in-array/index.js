/**
 * 寻找有序数组进行移动后的数组中的最小元素
 * 形如:
 * [1, 2, 3, 4, 5, 6]
 * [2, 3, 4, 5, 6, 1]
 */

/**
 * 二分的某种变形
 * 假设没有相同的数字
 */
const findTheMinInArray = (arr) => {

    let start = 0;
    let end = arr.length - 1;
    let middle;

    if (end === 0) {
        return end;
    }

    if (arr[start] < arr[end]) {
        return start;
    }

    if (arr[start] < arr[end - 1]) {
        return end;
    }

    while(start < end) {
        middle = Math.floor((start + end) / 2);

        const mid = arr[middle];
        const left = arr[middle - 1];
        const right = arr[middle + 1];

        if (mid > left && mid < right) {
            start = middle + 1;
        }

        if (mid < left && mid > right) {
            end = middle - 1;
        }

        if (mid < left && mid < right) {
            break;
        }

        if (mid > left && mid > right) {
            middle = middle + 1;
            break;
        }
    }

    return middle;
}

module.exports = findTheMinInArray;