import Seq from '../../src/seq';

describe('initInfinite()', () => {
  test('should generate sequence by invoking initializer', () => {
    const infiniteIntegers = Seq.initInfinite(
      () => global.getRandomNumber_ForTest(1000),
    );
    const first5ThreeDigitsNumber = infiniteIntegers.filter(
      (x) => x % 100 === 0,
    ).take(5);
    expect(first5ThreeDigitsNumber.length).toBe(5);

    const seq = Seq.initInfinite(global.getNumberGeneratorStartingFrom(0));
    const first5EvenNumbersAfter100 = seq.filter(
      (x) => x > 100 && x % 2 === 0,
    ).take(5);
    expect(first5EvenNumbersAfter100.toArray())
      .toEqual([102, 104, 106, 108, 110]);
  });

  test('should pass index number to initializer',
    () => {
      const id = (x) => x;
      const seq = Seq.initInfinite(id);
      expect(seq.take(5).toArray()).toEqual([0, 1, 2, 3, 4]);
    });

  test('should throw TypeError if the initializer is not a normal function', () => {
    expect(() => Seq.initInfinite({})).toThrow(TypeError);
    expect(() => Seq.initInfinite(function* () {})).toThrow(TypeError);
  });

  test('result seq should be closable and multi-iterable', () => {
    const seq = Seq.initInfinite((x) => x);
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

  // the test takes time.
  // test('should stop when index reaches Number.MAX_SAFE_INTEGER', () => {
  //    const seq = Seq.initInfinite(x => x);
  //    let last;
  //    for(const item of seq){
  //        last = item;
  //    }
  //    expect(last).toBe(Number.MAX_SAFE_INTEGER);
  // });
});
