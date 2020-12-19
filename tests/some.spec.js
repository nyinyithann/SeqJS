import Seq from '../src/seq';

describe('some()', () => {
    test('true case', () => {
        const seq = Seq.of(1, 2, 3, 4, 5);
        const actual = seq.some(x => x % 2 == 0);
        expect(actual).toBe(true);
    });

    test('false case', () => {
        const seq = Seq.of(1, 2, 3, 4, 5);
        const actual = seq.some(x => x > 5);
        expect(actual).toBe(false);
    });

    test('empty seq, false case', () => {
        const seq = Seq.empty();
        const actual = seq.some(x => x % 2 == 0);
        expect(actual).toBe(false);
    });

    test('throws error if predicate is not a function.', () => {
        const seq = Seq.of(1, 2, 3, 4, 5);
        expect(() => seq.some(null)).toThrow(TypeError);
    });

    test('throws error if the seq is null or undefined.', () => {
        const some = Seq.prototype.some;
        expect(some.call(Seq.of(1, 2), x => x > 1)).toBe(true);
        expect(() => some.call(null, x => x > 1)).toThrow(TypeError);
    });

    test('predicate can be a method of an object.', () => {
        let obj = {
            num: 4,
            greaterThan4: function (x) {
                return x > this.num;
            },
        };
        const seq = Seq.of(1, 2, 3, 4, 5);
        const actual = seq.some(obj.greaterThan4, obj);
        expect(actual).toBe(true);
    });
});
