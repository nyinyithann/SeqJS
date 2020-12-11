import Seq from '../src/seq';

describe('filter()', () => {

    let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let obj = {
        num: 4,
        greaterThan4: function (x) {
            return x > 4;
        },
    };

    test('filtering with arrow function.', () => {
        expect(([...Seq.from(nums).filter(x => x % 2 == 0)].join())).
            toBe(nums.filter(x => x % 2 == 0).join());
    });

    test('filtering with an object method.', () => {
        expect(([...Seq.from(nums).filter(obj.greaterThan4, obj)].join())).
            toBe(nums.filter(obj.greaterThan4, obj).join());
    });

    test('Should throw error if seq is null or undefined.', () => {
        const seqFilter = Seq.prototype.filter;
        expect(() => seqFilter(null, x => x > 2)).
            toThrow('This is null or not defined.');
    });

    test('Should throw error if predicate is not a function.', () => {
        expect(() => Seq.of(1, 2).filter(undefined)).toThrow(Error);
        expect(() => Seq.of(1, 2).filter(null)).toThrow(Error);
        expect(() => Seq.of(1, 2).filter({})).toThrow(Error);
    });

});