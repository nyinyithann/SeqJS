import Seq from '../src/seq';

describe('Spec of Seq.', () => {

    test('Seq is instantiated with default empty generator function.', () => {
        expect([...new Seq()]).toEqual([]);
    });

    test('Seq can be constructed with a generator function or an iterator.',
        () => {
            expect([...new Seq(generatorFunction_ForTest)]).toEqual(array_ForTest);
            expect([...new Seq(iterator_ForTest)]).toEqual([1, 2, 3, 4, 5]);
        });

    test('Seq can be constructed with an iterable (array).', () => {
        expect([...new Seq(array_ForTest)]).toEqual(array_ForTest);
    });

    test('Seq can be constructed with an iterable (string).', () => {
        expect([...new Seq('jobatahrefs')].join('')).toBe('jobatahrefs');
    });

    test('seq can be constructed with an array-like object', () => {
        const seq = Seq.from(arrayLikeObject_ForTest);
        expect(seq.toArray()).toEqual(Array.prototype.slice.call(arrayLikeObject_ForTest));
    });

    test(
        'Seq constructor throws error if source is not an iterable nor a generator function.',
        () => {
            expect(() => new Seq(null)).toThrow(Error);
        });

    test('Seq is multi-iterable.', () => {
        const seq = new Seq(array_ForTest);
        for (const item of seq) {}
        const s1 = [...seq];
        const s2 = [...seq];
        expect(s1).toEqual(s2);
    });

    test('Seq is closable.', () => {
        const seq = new Seq(array_ForTest);
        for (const item of seq) {
            if (item === 2) break;
        }
        const s1 = [...seq];
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
        const mappedSeq = seq.map(x => x * x);
        expect([...mappedSeq]).toEqual([...seq.map(x => x * x)]);
        expect([...seq]).toEqual([1, 2, 3, 4, 5]);
    });
});

describe(`Seq's static methods.`, () => {

    test('Seq.from()', () => {
        expect([...Seq.from([1, 2, 3])]).toEqual([1, 2, 3]);
    });

    test('Seq.of()', () => {
        expect([...Seq.of([1, 2, 3], 'a', 'b', 'c')]).
            toEqual([[1, 2, 3], 'a', 'b', 'c']);
    });

    test('Seq.isSeq()', () => {
        expect(Seq.isSeq(new Seq())).toBe(true);
    });

});