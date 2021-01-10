import Seq from '../../src/main';

describe('toString()', () => {
  test('should throw error if the existing sequence is null or undefined', () => {
    const toString = Seq.prototype.toString;
    expect(() => toString.call(null)).toThrow(TypeError);
    expect(toString.call(Seq.of(1, 2))).toBe('1, 2');
  });

  test('should return empty string if the existing sequence is empty', () => {
    expect(Seq.empty().toString()).toBe('');
  });

  test('should return all elements concatenated with , if the count of elements are <= 128', () => {
    const seq1 = Seq.of(1, 2, 3);
    expect(seq1.toString()).toEqual('1, 2, 3');
    const seq2 = Seq.init(128, (x) => x);
    expect(seq2.toString().endsWith(',...')).toBe(false);
  });

  test('should return all elements concatenated with , and ended with ,... if the count of elements are > 128', () => {
    const seq1 = Seq.init(129, (x) => x);
    expect(seq1.toString().endsWith(',...')).toBe(true);
  });
});
