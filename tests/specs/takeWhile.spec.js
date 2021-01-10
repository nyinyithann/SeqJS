import Seq from '../../src/main';

describe('takeWhile()', () => {
  const seq = Seq.from([1, 2, 3, 4, 5]);

  test('should return a new seq by invoking predicate on source sequence',
    () => {
      expect(seq.takeWhile((x) => x <= 3).toArray()).toEqual([1, 2, 3]);
      expect(seq.takeWhile((x) => x > 1).toArray()).toEqual([]);
      expect(seq.takeWhile((x) => x > 0).toArray()).toEqual([1, 2, 3, 4, 5]);
    });

  test('predicate can be a method of an object', () => {
    const obj = {
      x: 5,
      predicate(y) {
        return y < this.x;
      },
    };
    expect(seq.takeWhile(obj.predicate, obj).toArray()).toEqual([1, 2, 3, 4]);
  });

  test('should throw TypeError if the existing sequence is null or undefined.', () => {
    const { takeWhile } = Seq.prototype;
    expect(() => takeWhile(null, (x) => x)).toThrow(TypeError);
    expect(() => takeWhile(undefined, (x) => x)).toThrow(TypeError);
  });

  test(
    'should throw TypeError if predicate is not a function or a generator function',
    () => {
      expect(() => seq.takeWhile({})).toThrow(TypeError);
      expect(() => seq.takeWhile(function* () {})).toThrow(TypeError);
    },
  );

  test('invocation via call/apply/bind should be fine', () => {
    const { takeWhile } = Seq.prototype;
    expect(takeWhile.call(seq, (x) => x <= 4).toArray())
      .toEqual([1, 2, 3, 4]);
    expect(takeWhile.apply(seq, [(x) => x <= 4]).toArray())
      .toEqual([1, 2, 3, 4]);
    expect(takeWhile.bind(seq)((x) => x <= 4).toArray())
      .toEqual([1, 2, 3, 4]);
  });
});
