import Seq from '../../src/seq';

describe('length property', () => {
  test('length of iterator source', () => {
    const seq = Seq.of(1, 2, 3);
    expect(seq.length).toBe(3);
  });

  test('length of array or array-like source', () => {
    const seq = new Seq([1, 2, 3, 4, 5]);
    expect(seq.length).toBe(5);
    const arrayLike = {
      0: 0, 1: 1, 2: 2, length: 3,
    };
    expect(Seq.from(arrayLike).length).toBe(3);
  });

  test('should throw TypeError if the sequence is null or undefined', () => {
    const length = Object.getOwnPropertyDescriptor(Seq.prototype, 'length').get;
    expect(() => length.call(null)).toThrow(TypeError);
  });

  test('invocation via apply/call/bind should work', () => {
    const length = Object.getOwnPropertyDescriptor(Seq.prototype, 'length').get;
    expect(length.call(Seq.of(1, 2, 3))).toBe(3);
    expect(length.apply(Seq.of(1, 2, 3))).toBe(3);
    expect(length.bind(Seq.of(1, 2, 3))()).toBe(3);
  });
});
