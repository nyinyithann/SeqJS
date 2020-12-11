import Seq from '../src/seq';

describe('Spec of Seq.', () => {

    const array = [1, 2, 3, 4, 5];
    const iterator = {
        i: 1,
        [Symbol.iterator] () {
            return this;
        },
        next () {
            if (this.i <= 5) {
                return { value: this.i++, done: false };
            }
            return { done: true };
        },
    };
    const generator = function * () {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
        yield 5;
    };

    test('Seq is instantiated with default empty generator function.', () => {
        expect([...new Seq()].join()).toBe([].join());
    });

    test('Seq can be constructed with a generator function.', () => {
        expect([...new Seq(generator)].join()).toBe(array.join());
    });

    test('Seq can be constructed with an iterable (array).', () => {
        expect([...new Seq(array)].join()).toBe(array.join());
    });

    test('Seq can be constructed with an iterable (string).', () => {
        expect([...new Seq('jobatahrefs')].join('')).toBe('jobatahrefs');
    });

    test(
        'Seq constructor throws error if source is not an iterable nor a generator function.',
        () => {
            expect(() => new Seq(null)).toThrow(Error);
        });

    test('Seq is multi-iterable.', () => {
        const seq = new Seq(array);
        for (const item of seq) {}
        const s1 = [...seq];
        const s2 = [...seq];
        expect(s1.join()).toBe(s2.join());
    });

    test('Seq is closable.', () => {
        const seq = new Seq(array);
        for (const item of seq) {
            if (item == 2) break;
        }
        const s1 = [...seq];
        for (const item of seq) {
            if (item == 4) break;
        }
        const s2 = [...seq];
        expect(s1.join()).toBe(s2.join());
    });

    test('instanceof', () => {
        expect(new Seq() instanceof Seq).toBe(true);
    });

});

describe(`Seq's static methods.`, () => {
    test('Seq.from()', () => {
        expect([...Seq.from([1, 2, 3])].join()).toBe([1, 2, 3].join());
    });

    test('Seq.of()', () => {
        expect([...Seq.of([1, 2, 3], 'a', 'b', 'c')].join()).
            toBe([[1, 2, 3], 'a', 'b', 'c'].join());
    });

    test('Seq.isSeq()', () => {
        expect(Seq.isSeq(new Seq())).toBe(true);
    });
});