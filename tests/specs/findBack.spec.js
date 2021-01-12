import Seq from '../../src/main';

describe('findBack()', () => {
  test('should throw type error if the sequence is null or undefined, or '
          + 'predicate is a generator function or not a function', () => {
    const lastBy = Seq.prototype.findBack;
    expect(() => lastBy.call(null)).toThrow(TypeError);
    expect(() => Seq.empty().findBack(null)).toThrow(TypeError);
    expect(() => Seq.empty().findBack(undefined)).toThrow(TypeError);
    expect(() => Seq.empty().findBack(function* () {})).toThrow(TypeError);
  });

  test('invocation via call/apply/bind should work', () => {
    const lastBy = Seq.prototype.findBack;
    const seq = Seq.of(2, 3, 4, 200, 100, 2);
    expect(lastBy.call(seq, (x) => x % 50 === 0)).toBe(100);
    expect(lastBy.apply(seq, [(x) => x % 50 === 0])).toBe(100);
    expect(lastBy.bind(seq)((x) => x % 50 === 0)).toBe(100);
  });

  test('predicate might be associate with a context', () => {
    const context = {
      fifty: 50,
    };
    const predicate = function (x) { return x > this.fifty; };
    const seq = Seq.of(2, 3, 4, 200, 100, 2);
    expect(seq.findBack(predicate, context)).toBe(100);
  });

  test('should return the last element that satisfies the condition in predicate', () => {
    const seq = Seq.of(1, 2, 42, 323, 423, 32, 23, 10, 11);
    expect(seq.findBack((x) => x % 2 === 0)).toBe(10);
    expect((Seq.from([2, 3, 4, 5, 7, 4]).findBack((x) => x % 2 === 1))).toBe(7);
    expect((Seq.from(global.arrayLikeObject_ForTest).findBack((x) => x > 'a'))).toBe('e');
  });
});
