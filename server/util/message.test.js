const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const expectedValue = {
      from: 'Lakmal',
      text: 'Hey there!!'
    };
    const returnValue = generateMessage(expectedValue.from, expectedValue.text);
    expect(returnValue.from).toEqual(expectedValue.from);
    expect(returnValue.text).toEqual(expectedValue.text);
    expect(returnValue.createdAt).toBeA('number');
  });
});
