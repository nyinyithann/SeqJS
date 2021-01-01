import Seq from '../src/main';

describe('toArray()', () => {
  test('return array without touching original source', () => {
    const seq = Seq.of(1, 2, 3, 4);
    expect(seq.toArray()).toEqual([1, 2, 3, 4]);
    expect([...seq]).toEqual([1, 2, 3, 4]);
  });

  test('call/apply invocation should work', () => {
    const { toArray } = Seq.prototype;
    expect(toArray.call(Seq.of(1, 2, 3))).toEqual([1, 2, 3]);
  });

  test(
    'call/apply invocation on null or undefined seq should throw TypeError',
    () => {
      const { toArray } = Seq.prototype;
      expect(() => toArray.call(null)).toThrow(TypeError);
    },
  );
});
