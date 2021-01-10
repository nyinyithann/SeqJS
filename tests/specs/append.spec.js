import Seq from '../../src/main';

describe('append()', () => {
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

  test('append array.', () => {
    const seq = Seq.of(1, 2, 3);
    const carr = seq.concat([4, 5, 6]);
    expect([...carr]).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('append a single value.', () => {
    expect([...Seq.of(1).concat(2)]).toEqual([1, 2]);
  });

  test('append a generator function.', () => {
    const seq = Seq.of(1, 2).concat(genFunc());
    expect([...seq]).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('should return existing sequence if no params are passed', () => {
    expect(Seq.of(1, 2, 3, 4, 5).concat().toArray()).toEqual([1, 2, 3, 4, 5]);
  });

  test('append an iterator.', () => {
    const seq = Seq.of(1, 2).concat(iterator);
    expect([...seq]).toEqual([1, 2, 1, 2]);
  });

  test('append an array-like object.', () => {
    const seq = Seq.of(1, 2).concat(arrayLike);
    expect([...seq]).toEqual([1, 2, 0, 1, 2]);
  });

  test('append a gen func, iterator, array, array-like obj, and single values', () => {
    const seq1 = Seq.of(1).concat(genFunc(), arrayLike, [1, 2, 3], 'A', 'B', { name: 'Foo' });
    const seq2 = Seq.of(1).concat(genFunc(), arrayLike, [1, 2, 3], 'A', 'B', { name: 'Foo' });
    expect(seq1.toArray()).toEqual([...seq2]);
  });

  test('invocation via call/apply/bind should work', () => {
    const concatMth = Seq.prototype.concat;
    const seq = Seq.of(1, 2, 3);
    expect([...concatMth.call(seq, 1)]).toEqual([1, 2, 3, 1]);
    expect([...concatMth.apply(seq, [2])]).toEqual([1, 2, 3, 2]);
    expect([...concatMth.bind(seq)([2])]).toEqual([1, 2, 3, 2]);
  });

  test('should throw TypeError if the existing sequence is null or undefined', () => {
    const concatMth = Seq.prototype.concat;
    expect(() => concatMth.call(null, 1)).toThrow(TypeError);
  });
});
