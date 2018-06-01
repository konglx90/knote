const expect = require('chai').expect;
const { find } = require('../find');

const arr = [
  [1, 2, 4, 5, 9],
  [2, 3, 6, 8, 10],
  [3, 6, 7, 9, 12],
  [5, 8, 9, 10, 15],
]

describe('expect', () => {
  it('find 7', () => {
    expect(find(7, arr)).to.deep.equal({searchX: 2, searchY: 2});
  });

  it('find 90', () => {
    expect(find(90, arr)).to.be.equal(false);
  });

  it('find 15', () => {
    expect(find(15, arr)).to.deep.equal({searchX: 4, searchY: 3});
  });
});
