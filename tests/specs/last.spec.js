import Seq from '../../src/seq';

describe('last()', () => {
  test('should throw TypeError if the existing sequence is null or undefined', () => {
    const last = Seq.prototype.last;
    expect(() => last.call(null)).toThrow(TypeError);
  });

  test('should return undefined if the sequence is empty', () => {
    expect(Seq.empty().last()).toBe(undefined);
  });

  test('should return the last element of the sequence', () => {
    expect(Seq.of(1).last()).toBe(1);
    expect(Seq.range(0, 10).last()).toBe(9);
    expect(Seq.from(global.arrayLikeObject_ForTest).last()).toBe('e');
    expect(Seq.from(global.array_ForTest).last()).toBe(5);
  });

  test('invocation via call/apply/bind should work', () => {
    const last = Seq.prototype.last;
    const seq = Seq.range(1, 100);
    expect(last.call(seq)).toBe(99);
    expect(last.apply(seq)).toBe(99);
    expect(last.bind(seq)()).toBe(99);
  });
});
