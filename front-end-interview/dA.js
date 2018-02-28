
/**
 * "[a,[b],c]" => ['a', ['b'], 'c']
 */
const formatStrToArray = (format) => {
    const jsonStr = format.replace(/[^\[\],]/g, ($1) => {
        return `"${$1}"`
    });
    return JSON.parse(jsonStr);
}

const S = (arr, formatArray, ans) => {
    let C = [];
	let D = [];
    formatArray.forEach((a, index) => {
        if (Array.isArray(a)) {
            C = C.concat(a);
			D = D.concat(arr[index]);
        } else {
            ans[a] = arr[index];
        }
    });
    if (C.length > 0) {
        S(D, C, ans);
    }
}

const S1 = (arr, formatArray, ans) => {
    formatArray.forEach((a, index) => {
        if (Array.isArray(a)) {
			S1(arr[index], formatArray[index], ans);
        } else {
            ans[a] = arr[index];
        }
    });
}

/**
 * dA([1,[2,3],4], "[a,[b],c]") // 不能有空格
 * {a: 1, b: 2, c: 4}
 */
const dA = (arr, format) => {
    const formatArray = formatStrToArray(format);

    const ans = {};

    S(arr, formatArray, ans);

    return ans;
}

const arr = [1,[2,3],4];
const format = '[a,[b],c]';
const obj = dA(arr, format);

console.log('obj =>', obj);
