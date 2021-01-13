import Seq from '../../src/seq';

describe('iter()', () => {
  const seq = Seq.of(1, 2, 3, 4, 5);

  test('should throw type error if callback is not  a function', () => {
    expect(() => seq.iter(null)).toThrow(TypeError);
  });

  test('callback should work as intended', () => {
    const result = [];
    seq.iter((x) => result.push(x * x));
    expect(result).toEqual(seq.map((x) => x * x).toArray());
  });

  test('correct index should be passed to callback', () => {
    const result = [];
    seq.iter((x, i) => result.push([x, i]));
    expect(result).toEqual(seq.map((x, i) => [x, i]).toArray());
  });

  test('call/apply invocation should work', () => {
    const result = [];
    const { iter } = Seq.prototype;
    iter.call(seq, (x) => result.push(x + 1));
    expect(result).toEqual(seq.map((x) => x + 1).toArray());
    result.length = 0;
    iter.apply(seq, [(x) => result.push(x + 1)]);
    expect(result).toEqual(seq.map((x) => x + 1).toArray());
    result.length = 0;
    iter.bind(seq)((x) => result.push(x + 1));
    expect(result).toEqual(seq.map((x) => x + 1).toArray());
  });

  test(
    'call/apply invocation on null or undefined seq should throw TypeError',
    () => {
      const { iter } = Seq.prototype;
      expect(() => iter.call(null)).toThrow(TypeError);
    },
  );

  test('callback is a method of an object', () => {
    const obj = {
      result: [],
      i: 10,
      callback(x) {
        this.result.push(x + x);
      },
    };

    seq.iter(obj.callback, obj);
    expect(obj.result.length).toBe(seq.length);
    expect(obj.result).toEqual(seq.map((x) => x + x).toArray());
  });
});
