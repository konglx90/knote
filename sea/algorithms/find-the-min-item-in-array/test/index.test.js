const expect = require('chai').expect;
const findMin = require('../index');

const myArray = [3, 4, 5, 1, 2];

describe('expect', () => {
  it('find min', () => {
    expect(findMin(myArray)).to.deep.equal(3);
  });

  it('find min', () => {
    expect(findMin([1])).to.deep.equal(0);
  });

  it('find min', () => {
    expect(findMin([1, 2, 3])).to.deep.equal(0);
  });

  it('find min', () => {
    expect(findMin([4, 1, 2, 3])).to.deep.equal(1);
  });
});
