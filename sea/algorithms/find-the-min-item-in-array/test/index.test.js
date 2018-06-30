const expect = require('chai').expect;
const findMin = require('../index');

const myArray = [2, 3, 4, 5, 1];

describe('expect', () => {
  it('find min', () => {
    expect(findMin(myArray)).to.deep.equal(4);
  });
});
