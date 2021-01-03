import Seq from '../src/main';

describe('Spec of Seq.', () => {
  test('Seq is instantiated with default empty generator function.', () => {
    expect([...new Seq()]).toEqual([]);
  });

  test('Seq can be constructed with a generator function or an iterator.',
    () => {
      expect([...new Seq(global.generatorFunction_ForTest)]).toEqual(global.array_ForTest);
      expect([...new Seq(global.iterator_ForTest)]).toEqual([1, 2, 3, 4, 5]);
      const seq = new Seq(global.iterator_ForTest);
      let expected = 1;
      let current = seq.next();
      while (!current.done) {
        expect(current.value).toBe(expected);
        current = seq.next();
        expected += 1;
      }
    });

  test('Seq can be constructed with an iterable (array).', () => {
    expect([...new Seq(global.array_ForTest)]).toEqual(global.array_ForTest);
  });

  test('Seq can be constructed with an iterable (string).', () => {
    expect([...new Seq('jobatahrefs')].join('')).toBe('jobatahrefs');
  });

  test('seq can be constructed with an array-like object', () => {
    const seq = Seq.from(global.arrayLikeObject_ForTest);
    expect(seq.toArray()).toEqual(Array.prototype.slice.call(global.arrayLikeObject_ForTest));
  });

  test('Seq constructor throws error if source is a generator function or not a function.',
    () => {
      expect(() => new Seq(null)).toThrow(Error);
    });

  test('Seq is multi-iterable.', () => {
    const seq = new Seq(global.array_ForTest);
    // eslint-disable-next-line no-restricted-syntax,no-unused-vars,no-empty
    for (const item of seq) {}
    const s1 = [...seq];
    const s2 = [...seq];
    expect(s1).toEqual(s2);
  });

  test('Seq is closable.', () => {
    const seq = new Seq(global.array_ForTest);
    // eslint-disable-next-line no-restricted-syntax
    for (const item of seq) {
      if (item === 2) break;
    }
    const s1 = [...seq];
    // eslint-disable-next-line no-restricted-syntax
    for (const item of seq) {
      if (item === 4) break;
    }
    const s2 = [...seq];
    expect(s1).toEqual(s2);
  });

  test('instanceof', () => {
    expect(new Seq() instanceof Seq).toBe(true);
  });

  test('original seq is not mutated after operators are applied.', () => {
    const seq = Seq.of(1, 2, 3, 4, 5);
    const mappedSeq = seq.map((x) => x * x);
    expect([...mappedSeq]).toEqual([...seq.map((x) => x * x)]);
    expect([...seq]).toEqual([1, 2, 3, 4, 5]);
  });

  test('a seq is of type Seq.', () => {
    expect(Seq.isSeq(new Seq())).toBe(true);
  });
});
