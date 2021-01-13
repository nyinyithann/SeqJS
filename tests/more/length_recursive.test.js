import Seq from '../../src/seq';

describe('find length recursively', () => {
  function length(seq, n) {
    if (seq.isEmpty()) return n;
    return length(seq.tail(), n + 1);
  }

  test('find the length of a seq', () => {
    //const seq = Seq.init(15, (x) => x);
    //const seq = Seq.initInfinite(x => x).take(5);
    const seq = Seq.from([1,2,3,4,5]);
    expect(seq.length).toBe(length(seq, 0));
  });
});
