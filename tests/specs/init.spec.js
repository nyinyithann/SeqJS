import Seq from '../../src/main';

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
});
