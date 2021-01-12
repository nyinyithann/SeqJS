import Seq from '../../src/main';

describe('head()', () => {
  test('should throw error if the existing sequence is null or undefined when invocation via call/apply/bind', () => {
    const head = Seq.prototype.head;
    expect(() => head.call(null)).toThrow(TypeError);
  });

  test('should be able to invoke vai call/apply/bind', () => {
    const seq = Seq.initInfinite((x) => x + 100);
    const actual = seq.take(10).head();
    expect(actual).toBe(100);

    const head = Seq.prototype.head;
    expect(head.call(seq.take(1))).toBe(100);
    expect(head.apply(seq.take(1))).toBe(100);
    expect(head.bind(seq.take(1))()).toBe(100);
  });

  test('should return the first element if the existing sequence is not empty, otherwise; undefined', () => {
    const seq = Seq.init(5, (x) => x + 1);
    expect(seq.head()).toBe(1);
    expect(Seq.empty().head()).toBe(undefined);
  });
});
