import Seq from '../../src/seq';

describe('SeqCore.of', () => {
  test('should create a new sequence from elements passed', () => {
    const seq = Seq.of(1, 2, { three: 3 }, [4], '5', 0b110);
    expect(seq.toArray()).toEqual([1, 2, { three: 3 }, [4], '5', 6]);
  });
});
