import Seq from '../../src/main';

describe('isEmpty()', () => {
  test('empty sequence should be empty', () => {
    expect(Seq.empty().isEmpty()).toBe(true);
  });

  test('length of empty sequence is 0', () => {
    expect(Seq.empty().length).toBe(0);
  });

  test('should throw TypeError is the sequence is null or undefined', () => {
    const isEmpty = Seq.prototype.isEmpty;
    expect(() => isEmpty.apply(null)).toThrow(TypeError);
  });
});
