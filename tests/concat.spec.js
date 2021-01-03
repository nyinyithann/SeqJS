import Seq from '../src/main';

describe('concat()', () => {
  test('concat array.', () => {
    const seq = Seq.of(1, 2, 3);
    const carr = seq.concat([4, 5, 6]);
    expect([...carr]).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('concat a single value.', () => {
    expect([...Seq.of(1).concat(2)]).toEqual([1, 2]);
  });

  test('concat a generator function.', () => {
    const seq = Seq.of(1, 2).concat(function* () {
      yield* [3, 4, 5, 6];
    });
    expect([...seq]).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('should return existing sequence if no params are passed', () => {
    expect(Seq.of(1, 2, 3, 4, 5).concat().toArray()).toEqual([1, 2, 3, 4, 5]);
  });

  test('concat an iterator.', () => {
    const seq = Seq.of(1, 2).concat({
      * [Symbol.iterator]() {
        yield 1;
        yield 2;
      },
    });
    expect([...seq]).toEqual([1, 2, 1, 2]);
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
