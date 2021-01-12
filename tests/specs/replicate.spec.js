import Seq from '../../src/main';

describe('replicate()', () => {
  test('should generate a new sequence based on the params pass', () => {
    expect(Seq.replicate(5, 1).toArray()).toEqual([1, 1, 1, 1, 1]);
    const funcSeq = Seq.replicate(2, (x) => x);
    let acc = 0;
    funcSeq.iter((f) => acc += f(1));
    expect(acc).toBe(2);

    expect(Seq.replicate(2, null).toArray()).toEqual([null, null]);
    expect(Seq.replicate(2, undefined).toArray())
      .toEqual([undefined, undefined]);
  });

  test('should return an empty sequence if count is zero', () => {
    expect(Seq.replicate(0, 1).isEmpty()).toBe(true);
  });

  test('should throw TypeError if count is a negative number', () => {
    expect(() => Seq.replicate(-1, 1)).toThrow(TypeError);
  });
});
