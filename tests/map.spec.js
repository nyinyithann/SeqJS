import Seq from '../src/seq';

describe('map()', () => {

    let nums = [1, 2, 3, 4, 5];

    let obj = {
        counter: 10,
        add10: function (x) {
            return x + this.counter;
        },
    };

    test('mapping with arrow function.', () => {
        expect(([...Seq.from(nums).map(x => x + 1)].join())).
            toBe(nums.map(x => x + 1).join());
    });

    test('mapping with an object method.', () => {
        expect(([...Seq.from(nums).map(obj.add10, obj)].join())).
            toBe(nums.map(obj.add10, obj).join());
    });

    test('checking index.', () => {
        expect(([...Seq.from(nums).map((v, i) => [i, v])].join())).
            toBe([[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]].join());
    });

    test('Should throw error if seq is null or undefined.', () => {
        const seqMap = Seq.prototype.map;
        expect(() => seqMap(null, x => x + 1)).
            toThrow('This is null or not defined.');
    });

    test('Should throw error if callable is not a function.', () => {
        expect(() => Seq.of(1, 2).map(undefined)).toThrow(Error);
        expect(() => Seq.of(1, 2).map(null)).toThrow(Error);
        expect(() => Seq.of(1, 2).map({})).toThrow(Error);
    });

});