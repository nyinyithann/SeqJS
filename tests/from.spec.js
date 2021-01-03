import Seq from '../src/main';

describe('Seq.from', () => {
  test('create a seq from an array', () => {
    expect([...Seq.from([1, 2, 3])]).toEqual([1, 2, 3]);
  });

  test('should throw TypeError if source is not iterable', () => {
    expect(() => Seq.from(1)).toThrow(TypeError);
  });
});
