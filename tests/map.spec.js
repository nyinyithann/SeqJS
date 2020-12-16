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
        expect([...Seq.from(nums).map(x => x + 1)]).
            toEqual(nums.map(x => x + 1));
    });

    test('mapping with an object method.', () => {
        expect([...Seq.from(nums).map(obj.add10, obj)]).
            toEqual(nums.map(obj.add10, obj));
    });

    test('checking index.', () => {
        expect([...Seq.from(nums).map((v, i) => [i, v])]).
            toEqual([[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]]);
    });

    test('should throw error if seq is null or undefined.', () => {
        const seqMap = Seq.prototype.map;
        expect(() => seqMap.call(null, x => x + 1)).
            toThrow('This is null or not defined.');
    });

    test('calling upon prototype method.', () => {
        const seqMap = Seq.prototype.map;
        expect([...seqMap.call(Seq.from(nums),obj.add10, obj)]).
            toEqual(nums.map(obj.add10, obj));
    });

    test('should throw error if callable is not a function.', () => {
        expect(() => Seq.of(1, 2).map(undefined)).toThrow(Error);
        expect(() => Seq.of(1, 2).map(null)).toThrow(Error);
        expect(() => Seq.of(1, 2).map({})).toThrow(Error);
    });

});