import Seq from '../../src/seq';

describe('init()', () => {
  test(
    'should generate sequence by invoking initializer up to the given count',
    () => {
      const fiveRandoms = Seq.init(5,
        () => global.getRandomNumber_ForTest(1000));
      expect(fiveRandoms.length).toBe(5);

      const seq = Seq.init(3, (x) => x);
      expect(seq.toArray()).toEqual([0, 1, 2]);
    },
  );

  test('should throw TypeError if the initializer is not a normal function',
    () => {
      expect(() => Seq.init(5, {})).toThrow(TypeError);
      expect(() => Seq.init(5, function* () {})).toThrow(TypeError);
    });

  test('should throw TypeError if count is a negative number', () => {
    expect(() => Seq.init(-1, (x) => x)).toThrow(TypeError);
    expect(() => Seq.init([1], (x) => x)).toThrow(TypeError);
    expect(() => Seq.init({}, (x) => x)).toThrow(TypeError);
  });

  test('should return an empty sequence if count is 0', () => {
    expect(Seq.init(0, (x) => x).isEmpty()).toBe(true);
  });

  test('init dogfooding', () => {
    const seq = Seq.init(100, (x) => x);
    const fun = () => (
      seq.map((x) => x * x)
        .filter((x) => x % 2 === 0)
        .take(10)
        .item(2)
    );
    expect(fun()).toEqual(fun());
    expect(fun() + fun()).toEqual(fun() + fun());
  });

  test('result seq should be closable and multi-iterable', () => {
    const seq = Seq.init(1000, (x) => x);
    let stop = 1;
    // eslint-disable-next-line no-restricted-syntax,no-unused-vars
    for (const _ of seq) {
      if (stop === 6) {
        break;
      }
      stop += 1;
    }
    expect(seq.take(2).toArray()).toEqual([0, 1]);
    const actual = seq.take(5).toArray();
    const expected = seq.take(5).toArray();
    expect(actual).toEqual(expected);

    expect(seq.take(5).item(2) + seq.take(5).item(2))
      .toBe(4);
  });
});
