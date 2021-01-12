import Seq from '../../src/main';

describe('exists()', () => {
  test('true case', () => {
    const seq = Seq.of(1, 2, 3, 4, 5);
    const actual = seq.exists((x) => x % 2 === 0);
    expect(actual).toBe(true);
  });

  test('false case', () => {
    const seq = Seq.of(1, 2, 3, 4, 5);
    const actual = seq.exists((x) => x > 5);
    expect(actual).toBe(false);
  });

  test('empty seq, false case', () => {
    const seq = Seq.empty();
    const actual = seq.exists((x) => x % 2 === 0);
    expect(actual).toBe(false);
  });

  test('throws error if predicate is not a function or a generator function', () => {
    const seq = Seq.of(1, 2, 3, 4, 5);
    expect(() => seq.exists(null)).toThrow(TypeError);
    expect(() => seq.exists(function* () {})).toThrow(TypeError);
  });

  test('throws error if the seq is null or undefined.', () => {
    const { exists } = Seq.prototype;
    expect(exists.call(Seq.of(1, 2), (x) => x > 1)).toBe(true);
    expect(() => exists.call(null, (x) => x > 1)).toThrow(TypeError);
  });

  test('invocation via call/apply/bind should work', () => {
    const { exists } = Seq.prototype;
    expect(exists.call(Seq.of(1, 2), (x) => x % 2 === 0)).toBe(true);
    expect(exists.apply(Seq.of(1, 2), [(x) => x % 2 === 0])).toBe(true);
    expect(exists.bind(Seq.of(1, 2))((x) => x % 2 === 0)).toBe(true);
  });

  test('predicate can be a method of an object.', () => {
    const obj = {
      num: 4,
      greaterThan4(x) {
        return x > this.num;
      },
    };
    const seq = Seq.of(1, 2, 3, 4, 5);
    const actual = seq.exists(obj.greaterThan4, obj);
    expect(actual).toBe(true);
  });
});
