import Seq from '../../src/seq';

describe('toArray()', () => {
  test('should return a new array without mutating original source', () => {
    const seq = Seq.of(1, 2, 3, 4);
    expect(seq.toArray()).toEqual([1, 2, 3, 4]);
    expect([...seq]).toEqual([1, 2, 3, 4]);
  });

  test('invocation via call/apply/bind should work', () => {
    const { toArray } = Seq.prototype;
    expect(toArray.call(Seq.of(1, 2, 3))).toEqual([1, 2, 3]);
    expect(toArray.apply(Seq.of(1, 2, 3))).toEqual([1, 2, 3]);
    expect(toArray.bind(Seq.of(1, 2, 3))()).toEqual([1, 2, 3]);
  });

  test(
    'should throw TypeError if the source sequence is null or undefined',
    () => {
      const { toArray } = Seq.prototype;
      expect(() => toArray.call(null)).toThrow(TypeError);
    },
  );
});
