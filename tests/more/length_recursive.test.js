import Seq from '../../src/seq';

describe('find length recursively', () => {
  function length(seq, n) {
    if (seq.isEmpty()) return n;
    return length(seq.tail(), n + 1);
  }

  test('find the length of a seq', () => {
    const seq = Seq.init(10, (x) => x);
    expect(seq.length).toBe(length(seq, 0));
  });
});
