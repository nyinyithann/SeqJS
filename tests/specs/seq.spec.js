import Seq from '../../src/seq';

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
    const seq = new Seq(global.array_ForTest);
    expect([...seq]).toEqual(global.array_ForTest);
    expect([...seq]).toEqual([...seq]);
  });

  test('Seq can be constructed with an iterable (string).', () => {
    const seq = new Seq('jobatahrefs');
    expect([...seq].join('')).toBe('jobatahrefs');
    expect([...seq].join('')).toBe(seq.toArray().join(''));
  });

  test('seq can be constructed with an array-like object', () => {
    const seq = Seq.from(global.arrayLikeObject_ForTest);
    // eslint-disable-next-line no-restricted-syntax,no-unused-vars,no-empty
    for (const item of seq) {}
    const s1 = [...seq];
    const s2 = [...seq];
    expect(s1).toEqual(s2);
    const actual = seq.toArray();
    expect(actual).toEqual([].slice.call(global.arrayLikeObject_ForTest));
  });

  test('Seq constructor throws error if source is not iterable.',
    () => {
      expect(() => new Seq(1)).toThrow(Error);
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
    const expectedSeq = seq.map((x) => x * x);
    const actual = [...mappedSeq];
    const expected = [...expectedSeq];
    expect(actual).toEqual(expected);
    expect([...seq]).toEqual([1, 2, 3, 4, 5]);
  });

  test('a seq is of type Seq.', () => {
    expect(Seq.isSeq(new Seq())).toBe(true);
  });

  test('Seq can wrap array-like object', () => {
    const arrayLike = {
      0: 0, 1: 1, 2: 2, length: 3,
    };
    const seq = Seq.from(arrayLike);
    expect(seq.toArray()).toEqual([0, 1, 2]);
    expect(seq.toArray()).toEqual(seq.toArray());
  });
});
