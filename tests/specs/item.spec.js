import Seq from '../../src/main';

describe('item()', () => {
  test('should throw TypeError if the sequence is null or undefined; or index param is a negative number', () => {
    const item = Seq.prototype.item;
    expect(() => item.call(null)).toThrow(TypeError);
    expect(() => item.call(Seq.of(1, 2), -1)).toThrow(TypeError);
  });

  test('should return nth element of the sequence', () => {
    // let seq = Seq.range(0, 5);
    // expect(seq.item(3)).toBe(3);
    // expect(seq.item(0)).toBe(0);
    // expect(seq.item(4)).toBe(4);

    const seq = Seq.initInfinite((x) => x * x);
    expect(seq.item(2)).toBe(4);
    expect(seq.item(0)).toBe(0);
  });
});
