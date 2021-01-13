import Seq from '../../src/seq';

describe('tail()', () => {
  test('should throw error if the existing sequence is null or undefined when invocation via call/apply/bind', () => {
    const tail = Seq.prototype.tail;
    expect(() => tail.call(null)).toThrow(TypeError);
  });

  test('should return an empty sequence if the existing sequence is empty', () => {
    expect(Seq.empty().tail().isEmpty()).toBe(true);
  });

  test('should return an empty sequence if the existing sequence has only an element', () => {
    expect(Seq.of(1).tail().isEmpty()).toBe(true);
  });

  test('should return the rest of elements except the first', () => {
    const seq = Seq.init(10, (x) => x);
    expect(seq.tail().toArray()).toEqual(Seq.init(9, (x) => x + 1).toArray());
    expect(Seq.of(1, 2).tail().toArray()).toEqual([2]);
  });

  test('should be able to invoke via call/apply/bind', () => {
    const seq = Seq.of(1, 2, 3, 4);
    const tail = Seq.prototype.tail;
    expect(tail.call(seq).toArray()).toEqual([2, 3, 4]);
    expect(tail.apply(seq).toArray()).toEqual([2, 3, 4]);
    expect(tail.bind(seq)().toArray()).toEqual([2, 3, 4]);
  });
});
