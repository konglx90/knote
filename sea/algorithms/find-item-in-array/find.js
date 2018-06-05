// 一个左到右，上到下非递减的数组

const find = (num, arr) => {
  const maxXIndex = arr[0].length - 1;
  const maxYIndex = arr.length - 1;

  let searchX = maxXIndex, searchY = 0;

  while(searchX >=0 && searchY <= maxYIndex) {
    const value = arr[searchY][searchX];

    if (value === num) {
      break;
    }

    if (value > num) {
      searchX --;
    }

    if (value < num) {
      searchY ++;
    }

  }

  if (searchX < 0 || searchY > maxYIndex) {
    return false;
  }

  return {
    searchX,
    searchY,
  }
}

// console.log(find(200, arr));

module.exports = {
  find,
}
