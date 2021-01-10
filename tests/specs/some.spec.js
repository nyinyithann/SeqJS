import Seq from '../../src/main';

describe('some()', () => {
  test('true case', () => {
    const seq = Seq.of(1, 2, 3, 4, 5);
    const actual = seq.some((x) => x % 2 === 0);
    expect(actual).toBe(true);
  });

  test('false case', () => {
    const seq = Seq.of(1, 2, 3, 4, 5);
    const actual = seq.some((x) => x > 5);
    expect(actual).toBe(false);
  });

  test('empty seq, false case', () => {
    const seq = Seq.empty();
    const actual = seq.some((x) => x % 2 === 0);
    expect(actual).toBe(false);
  });

  test('throws error if predicate is not a function or a generator function', () => {
    const seq = Seq.of(1, 2, 3, 4, 5);
    expect(() => seq.some(null)).toThrow(TypeError);
    expect(() => seq.some(function* () {})).toThrow(TypeError);
  });

  test('throws error if the seq is null or undefined.', () => {
    const { some } = Seq.prototype;
    expect(some.call(Seq.of(1, 2), (x) => x > 1)).toBe(true);
    expect(() => some.call(null, (x) => x > 1)).toThrow(TypeError);
  });

  test('invocation via call/apply/bind should work', () => {
    const { some } = Seq.prototype;
    expect(some.call(Seq.of(1, 2), (x) => x % 2 === 0)).toBe(true);
    expect(some.apply(Seq.of(1, 2), [(x) => x % 2 === 0])).toBe(true);
    expect(some.bind(Seq.of(1, 2))((x) => x % 2 === 0)).toBe(true);
  });

  test('predicate can be a method of an object.', () => {
    const obj = {
      num: 4,
      greaterThan4(x) {
        return x > this.num;
      },
    };
    const seq = Seq.of(1, 2, 3, 4, 5);
    const actual = seq.some(obj.greaterThan4, obj);
    expect(actual).toBe(true);
  });
});
