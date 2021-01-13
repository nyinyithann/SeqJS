import Seq from '../../src/seq';

describe('countBy()', () => {
  class Person {
    constructor(name, age) {
      this.Name = name;
      this.Age = age;
    }
  }

  test('should throw null if the existing sequence is null or undefined when invoke via call/apply/bind', () => {
    const countBy = Seq.prototype.countBy;
    expect(() => countBy.call(null)).toThrow(TypeError);
    expect(() => countBy.apply(null)).toThrow(TypeError);
    expect(() => countBy.bind(null)()).toThrow(TypeError);
  });

  test('invocation via call/apply/bind should work', () => {
    const seq = Seq.of(1, 1, 2, 2, 2, 4);
    const countBy = Seq.prototype.countBy;
    expect(countBy.call(seq, (x) => x).toArray()).toEqual([[1, 2], [2, 3], [4, 1]]);
    expect(countBy.apply(seq, [(x) => x]).toArray()).toEqual([[1, 2], [2, 3], [4, 1]]);
    expect(countBy.bind(seq)((x) => x).toArray()).toEqual([[1, 2], [2, 3], [4, 1]]);
  });

  test('should throw TypeError if projection is a generator function or not a function', () => {
    expect(() => Seq.of(1, 2).countBy(null)).toThrow(TypeError);
    expect(() => Seq.of(1, 2).countBy(undefined)).toThrow(TypeError);
    // eslint-disable-next-line no-void
    expect(() => Seq.of(1, 2).countBy(void 0)).toThrow(TypeError);
  });

  test('should work with different context of projection', () => {
    const obj = {
      prop: 'Name',
    };
    const projection = function (x) { return x[this.prop]; };
    const mrA = new Person('A', 20);
    const mrB = new Person('B', 15);
    const seq = Seq.of(mrA, mrA, mrB);
    expect(seq.countBy(projection, obj).toArray()).toEqual([['A', 2], ['B', 1]]);
  });

  test('should return the sequence containing values of type [key, count]', () => {
    const p1 = { Name: 'foo' };
    const p2 = { Name: 'foo' };
    const seq = Seq.of(1, 1, 2, 2, 2, 4, 5, 6, 6, 6, 6, 10, true, true, false, p1, p2);
    expect(seq.countBy((x) => x).toArray())
      .toEqual([
        [1, 2],
        [2, 3],
        [4, 1],
        [5, 1],
        [6, 4],
        [10, 1],
        [true, 2],
        [false, 1],
        [p1, 1],
        [p2, 1],
      ]);

    const mrA = new Person('A', 20);
    const mrB = new Person('B', 15);
    const mrC = new Person('C', 15);
    const personSeq = Seq.of(mrA, mrA, mrA, mrB, mrB, mrC, mrC, mrC, null, null, undefined, undefined);
    expect(personSeq.countBy((x) => x?.Name).toArray())
      .toEqual([
        ['A', 3],
        ['B', 2],
        ['C', 3],
        [undefined, 4],
      ]);
  });
});
