import Seq from '../../src/main';

describe('forall()', () => {
  test('true case', () => {
    const seq = Seq.of(2, 4, 6, 8, 10);
    const actual = seq.every((x) => x % 2 == 0);
    expect(actual).toBe(true);
  });

  test('false case', () => {
    const seq = Seq.of(1, 2, 3, 4, 5);
    const actual = seq.every((x) => x % 2 == 0);
    expect(actual).toBe(false);
  });

  test('empty seq, true case', () => {
    const seq = Seq.empty();
    const actual = seq.every((x) => x % 2 == 0);
    expect(actual).toBe(true);
  });

  test('throws error if predicate is not a function or a generator function.', () => {
    const seq = Seq.of(1, 2, 3, 4, 5);
    expect(() => seq.every(null)).toThrow(TypeError);
    expect(() => seq.every(function* () {})).toThrow(TypeError);
  });

  test('throws error if the seq is null or undefined.', () => {
    const { every } = Seq.prototype;
    expect(every.call(Seq.of(1, 2), (x) => x >= 1)).toBe(true);
    expect(() => every.call(null, (x) => x > 1)).toThrow(TypeError);
  });

  test('invocation via call/apply/bind should work', () => {
    const { every } = Seq.prototype;
    expect(every.call(Seq.of(1, 2), (x) => x > 0)).toBe(true);
    expect(every.apply(Seq.of(1, 2), [(x) => x > 0])).toBe(true);
    expect(every.bind(Seq.of(1, 2))((x) => x > 0)).toBe(true);
  });

  test('predicate can be a method of an object.', () => {
    const obj = {
      num: 1,
      greaterThan1(x) {
        return x > this.num;
      },
    };
    const seq = Seq.of(2, 3, 4, 5);
    const actual = seq.every(obj.greaterThan1, obj);
    expect(actual).toBe(true);
  });
});
