import Seq from '../../src/seq';

describe('take()', () => {
  test('take exists', () => {
    const seq = Seq.of(1, 2, 3, 4, 5);
    const taken = seq.take(2);
    expect([...taken]).toEqual([1, 2]);
  });

  test('take more', () => {
    const seq = Seq.of(1, 2, 3, 4, 5);
    const taken = seq.take(100);
    expect([...taken]).toEqual([1, 2, 3, 4, 5]);
  });

  test('take none', () => {
    const seq = Seq.of(1, 2, 3, 4, 5);
    const taken = seq.take(0);
    expect(taken.isEmpty()).toBe(true);
    expect([...seq]).toEqual([1, 2, 3, 4, 5]);
  });

  test('take from empty seq should be fine.', () => {
    const seq = Seq.empty();
    const taken = seq.take(10);
    expect(taken.isEmpty()).toBe(true);
  });

  test('should throw error if count is a non-negative', () => {
    const seq = Seq.of(1, 2, 3, 4, 5);
    expect(() => seq.take(-1)).toThrow(TypeError);
  });

  test('apply/call invocation', () => {
    const seq = Seq.of(1, 2, 3, 4, 5);
    const { take } = Seq.prototype;
    const taken = take.call(seq, 3);
    expect([...taken]).toEqual([1, 2, 3]);
  });

  test('apply/call invocation on null context should throw error', () => {
    const { take } = Seq.prototype;
    expect(() => take.call(null, 1)).toThrow(TypeError);
  });

  test('result seq should be closable and multi-iterable', () => {
    const seq = Seq.initInfinite((x) => x).take(4);
    const stop = 1;
    // eslint-disable-next-line no-restricted-syntax,no-unused-vars
    for (const _ of seq) {
      if (stop === 2) {
        break;
      }
      stop += 1;
    }
    expect(seq.take(2).toArray()).toEqual([0, 1]);
    const actual = seq.take(5).take(2).toArray();
    const expected = seq.take(5).take(2).toArray();
    expect(actual).toEqual(expected);
  });
});
