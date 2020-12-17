import Seq from '../src/seq';

describe('every()', () => {
    test('true case',() => {
        const seq = Seq.of(2,4,6,8,10);
        const actual = seq.every(x => x % 2 == 0);
        expect(actual).toBe(true);
    })

    test('false case',() => {
        const seq = Seq.of(1,2,3,4,5);
        const actual = seq.every(x => x % 2 == 0);
        expect(actual).toBe(false);
    })

    test('empty seq, true case',() => {
        const seq = Seq.empty();
        const actual = seq.every(x => x % 2 == 0);
        expect(actual).toBe(true);
    })

    test('throws error if predicate is not a function.',() => {
        const seq = Seq.of(1,2,3,4,5);
        expect(() => seq.every(null)).toThrow(TypeError);
    })

    test('throws error if the seq is null or undefined.', () => {
        const every = Seq.prototype.every;
        expect(every.call(Seq.of(1,2), x => x >= 1)).toBe(true);
        expect(() => every.call(null, x => x > 1)).toThrow(TypeError);
    });

    test('predicate can be a method of an object.', () => {
        let obj = {
            num: 1,
            greaterThan1: function (x) {
                return x > this.num;
            },
        };
        const seq = Seq.of(2,3,4,5);
        const actual = seq.every(obj.greaterThan1, obj);
        expect(actual).toBe(true);
    });
});