import Seq from '../../src/seq';

describe('filter()', () => {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const obj = {
    num: 4,
    greaterThan4(x) {
      return x > this.num;
    },
  };

  test('filtering with arrow function', () => {
    expect([...Seq.from(nums).filter((x) => x % 2 === 0)]).toEqual(nums.filter((x) => x % 2 === 0));
  });

  test('filtering with an object method', () => {
    expect([...Seq.from(nums).filter(obj.greaterThan4, obj)]).toEqual(nums.filter(obj.greaterThan4, obj));
  });

  test('should throw error if seq is null or undefined', () => {
    const seqFilter = Seq.prototype.filter;
    expect(() => seqFilter.call(null, (x) => x > 2)).toThrow(TypeError);
  });

  test('invocation via call/apply/bind should work', () => {
    const seqFilter = Seq.prototype.filter;
    expect([...seqFilter.call(Seq.from(nums), obj.greaterThan4, obj)]).toEqual(nums.filter(obj.greaterThan4, obj));
    expect([...seqFilter.apply(Seq.from(nums), [obj.greaterThan4, obj])]).toEqual(nums.filter(obj.greaterThan4, obj));
    expect([...seqFilter.bind(Seq.from(nums))(obj.greaterThan4, obj)]).toEqual(nums.filter(obj.greaterThan4, obj));
  });

  test('should throw error if predicate is not a function', () => {
    expect(() => Seq.of(1, 2).filter(undefined)).toThrow(Error);
    expect(() => Seq.of(1, 2).filter(null)).toThrow(Error);
    expect(() => Seq.of(1, 2).filter({})).toThrow(Error);
  });

  test('filter dogfooding', () => {
    const seq = Seq.range(1, 101);
    let fun = () => (
      seq.map((x) => x + x)
        .filter((x) => x % 2 === 0)
        .take(10)
        .item(2)
    );
    expect(fun()).toEqual(6);
    expect(fun()).toEqual(fun());
    expect(fun() + fun()).toEqual(12);
    expect(fun() + fun()).toEqual(fun() + fun());

    fun = () => (
      seq.map((x) => x + x)
        .filter((x) => x % 2 === 0)
        .take(10)
        .reduce((x, y) => x + y, 0)
    );
    const rest = fun();
    expect(fun() + fun() + fun()).toBe(rest + rest + fun());

    expect(global.pipe(seq, Seq.filter((x) => x % 2 === 1)).take(2).toArray()).toEqual([1, 3]);
  });
});
