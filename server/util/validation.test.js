const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should return true for valid string', () => {
    const stringOne = 'Lakmal';
    const stringTwo = 'L';
    const stringThree = 'Lakmal123';
    expect(isRealString(stringOne)).toBe(true);
    expect(isRealString(stringTwo)).toBe(true);
    expect(isRealString(stringThree)).toBe(true);
  });

  it('should return false for invalid string', () => {
    const stringOne = '';
    const stringTwo = 12313;
    const stringThree = true
    expect(isRealString(stringOne)).toBe(false);
    expect(isRealString(stringTwo)).toBe(false);
    expect(isRealString(stringThree)).toBe(false);
  });
});
