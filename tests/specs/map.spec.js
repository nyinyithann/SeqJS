import Seq from '../../src/seq';

describe('map()', () => {
  const nums = [1, 2, 3, 4, 5];

  const obj = {
    counter: 10,
    add10(x) {
      return x + this.counter;
    },
  };

  test('should tak arrow function as callback', () => {
    expect([...Seq.from(nums).map((x) => x + 1)])
      .toEqual(nums.map((x) => x + 1));
  });

  test('should work with a callback method of an object', () => {
    expect([...Seq.from(nums).map(obj.add10, obj)])
      .toEqual(nums.map(obj.add10, obj));
  });

  test('should pass index for each item', () => {
    expect([...Seq.from(nums).map((v, i) => [i, v])])
      .toEqual([[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]]);
  });

  test('should throw error if seq is null or undefined.', () => {
    const seqMap = Seq.prototype.map;
    expect(() => seqMap.call(null, (x) => x + 1))
      .toThrow(TypeError);
  });

  test('invocation via call/apply/bind should work', () => {
    const seqMap = Seq.prototype.map;
    expect([...seqMap.call(Seq.from(nums), obj.add10, obj)])
      .toEqual(nums.map(obj.add10, obj));
    expect([...seqMap.apply(Seq.from(nums), [obj.add10, obj])])
      .toEqual(nums.map(obj.add10, obj));
    expect([...seqMap.bind(Seq.from(nums))(obj.add10, obj)])
      .toEqual(nums.map(obj.add10, obj));
  });

  test('should throw error if callback is not a function.', () => {
    expect(() => Seq.of(1, 2).map(undefined)).toThrow(Error);
    expect(() => Seq.of(1, 2).map(null)).toThrow(Error);
    expect(() => Seq.of(1, 2).map({})).toThrow(Error);
  });

  test('map dogfooding', () => {
    const seq = Seq.initInfinite((x) => x);
    const actualOne = seq.map((x) => x + 1).take(5);
    const actualTwo = seq.map((x) => x + 1).take(5);
    expect(actualOne.toArray()).toEqual([1, 2, 3, 4, 5]);
    expect(actualTwo.toArray()).toEqual([1, 2, 3, 4, 5]);
    expect(actualTwo.toArray()).toEqual(actualTwo.toArray());
    expect(seq.item(2) + seq.item(2)).toBe(4);
    expect(seq.map((x) => x + 100).take(10).head() + seq.map((x) => x + 100).take(10).head())
      .toBe(200);

    expect((Seq.map((x) => x + 1)(seq)).take(2).toArray()).toEqual([1, 2]);

    // seq |> SeqCore.map (x => x + 1) in future
    expect(global.pipe(seq, Seq.map((x) => x + 1)).take(2).toArray()).toEqual([1, 2]);
  });
});
