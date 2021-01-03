import Seq from '../src/main';

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
