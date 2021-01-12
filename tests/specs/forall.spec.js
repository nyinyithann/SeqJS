import Seq from '../../src/main';

describe('forall()', () => {
  test('true case', () => {
    const seq = Seq.of(2, 4, 6, 8, 10);
    const actual = seq.forall((x) => x % 2 == 0);
    expect(actual).toBe(true);
  });

  test('false case', () => {
    const seq = Seq.of(1, 2, 3, 4, 5);
    const actual = seq.forall((x) => x % 2 == 0);
    expect(actual).toBe(false);
  });

  test('empty seq, true case', () => {
    const seq = Seq.empty();
    const actual = seq.forall((x) => x % 2 == 0);
    expect(actual).toBe(true);
  });

  test('throws error if predicate is not a function or a generator function.', () => {
    const seq = Seq.of(1, 2, 3, 4, 5);
    expect(() => seq.forall(null)).toThrow(TypeError);
    expect(() => seq.forall(function* () {})).toThrow(TypeError);
  });

  test('throws error if the seq is null or undefined.', () => {
    const { forall } = Seq.prototype;
    expect(forall.call(Seq.of(1, 2), (x) => x >= 1)).toBe(true);
    expect(() => forall.call(null, (x) => x > 1)).toThrow(TypeError);
  });

  test('invocation via call/apply/bind should work', () => {
    const { forall } = Seq.prototype;
    expect(forall.call(Seq.of(1, 2), (x) => x > 0)).toBe(true);
    expect(forall.apply(Seq.of(1, 2), [(x) => x > 0])).toBe(true);
    expect(forall.bind(Seq.of(1, 2))((x) => x > 0)).toBe(true);
  });

  test('predicate can be a method of an object.', () => {
    const obj = {
      num: 1,
      greaterThan1(x) {
        return x > this.num;
      },
    };
    const seq = Seq.of(2, 3, 4, 5);
    const actual = seq.forall(obj.greaterThan1, obj);
    expect(actual).toBe(true);
  });
});
