const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
  it('should generate correct location message object', () => {
    const lon = 123;
    const lat = 123;
    const from = 'Admin'
    const expectedValue = {
      from,
      url: `https://www.google.com/maps?q=${lat},${lon}`
    };
    const returnValue = generateLocationMessage(from, lat, lon);
    expect(returnValue.from).toEqual(expectedValue.from);
    expect(returnValue.url).toEqual(expectedValue.url);
    expect(returnValue.createdAt).toBeA('number');
  });
});
