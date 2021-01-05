import Seq from '../src/main';

describe('prepend()', () => {
  const genFunc = function* () {
    yield* [3, 4, 5, 6];
  };

  const iterator = {
    * [Symbol.iterator]() {
      yield 1;
      yield 2;
    },
  };

  const arrayLike = {
    0: 0, 1: 1, 2: 2, length: 3,
  };

  test('prepend array.', () => {
    const seq = Seq.of(1, 2, 3);
    const carr = seq.prepend([4, 5, 6]);
    expect([...carr]).toEqual([4, 5, 6, 1, 2, 3]);
  });

  test('prepend a single value.', () => {
    expect([...Seq.of(1).prepend(2)]).toEqual([2, 1]);
  });

  test('prepend a generator function.', () => {
    const seq = Seq.of(1, 2).prepend(genFunc());
    expect([...seq]).toEqual([3, 4, 5, 6, 1, 2]);
  });

  test('should return existing sequence if no params are passed', () => {
    expect(Seq.of(1, 2, 3, 4, 5).prepend().toArray()).toEqual([1, 2, 3, 4, 5]);
  });

  test('prepend an iterator.', () => {
    const seq = Seq.of(3, 4).prepend(iterator);
    expect([...seq]).toEqual([1, 2, 3, 4]);
  });

  test('prepend an array-like object.', () => {
    const seq = Seq.of('A', 'B').prepend(arrayLike);
    expect([...seq]).toEqual([0, 1, 2, 'A', 'B']);
  });

  test('prepend a gen func, iterator, array, array-like obj, and single values', () => {
    const seq1 = Seq.of(1).prepend(genFunc(), arrayLike, [1, 2, 3], 'A', 'B', { name: 'Foo' });
    const seq2 = Seq.of(1).prepend(genFunc(), arrayLike, [1, 2, 3], 'A', 'B', { name: 'Foo' });
    expect(seq1.toArray()).toEqual([...seq2]);
  });

  test('invocation via call/apply/bind should work', () => {
    const prepend = Seq.prototype.prepend;
    const seq = Seq.of(1, 2, 3);
    expect([...prepend.call(seq, 1)]).toEqual([1, 1, 2, 3]);
    expect([...prepend.apply(seq, [2])]).toEqual([2, 1, 2, 3]);
    expect([...prepend.bind(seq)([2])]).toEqual([2, 1, 2, 3]);
  });

  test('should throw TypeError if the existing sequence is null or undefined', () => {
    const prepend = Seq.prototype.prepend;
    expect(() => prepend.call(null, 1)).toThrow(TypeError);
  });
});
