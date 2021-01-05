import Seq from '../src/main';

describe('reverse()', () => {
  test('reverse from array or array-like object', () => {
    const arrayLike = {
      0: 0, 1: 1, 2: 2, length: 3,
    };
    expect(Seq.from(arrayLike).reverse().toArray()).toEqual([2, 1, 0]);
    const array = [1, 2, 3, 4, 5];
    expect(Seq.from(array).reverse().toArray()).toEqual(array.reverse());

    let seq = Seq.range(0, 500, -3);
    expect(seq.reverse().toArray()).toEqual(seq.reverse().toArray());

    seq = Seq.range(0);
    expect(seq.reverse().toArray()).toEqual(seq.reverse().toArray());
  });

  test('invocation via call/apply/bind should work', () => {
    const seq = Seq.range(0, 500, -2);
    const reverse = Seq.prototype.reverse;

    expect(reverse.call(seq).toArray()).toEqual(seq.reverse().toArray());
    expect(reverse.apply(seq).toArray()).toEqual(seq.reverse().toArray());
    expect(reverse.bind(seq)().toArray()).toEqual(seq.reverse().toArray());
  });

  test('should throw TypeError if the existing source is null or undefined', () => {
    const reverse = Seq.prototype.reverse;
    expect(() => reverse.call(null)).toThrow(TypeError);
  });
});
