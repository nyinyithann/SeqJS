import Seq from '../src/main';

describe('length property', () => {
  test('length of iterator source', () => {
    const seq = Seq.of(1, 2, 3);
    expect(seq.length).toBe(3);
  });

  test('length of array source', () => {
    const seq = new Seq([1, 2, 3, 4, 5]);
    expect(seq.length).toBe(5);
  });
});
