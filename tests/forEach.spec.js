import Seq from '../src/seq';

describe('forEach()', () => {

    const seq = Seq.of(1, 2, 3, 4, 5);

    test('should throw type error if callback is not  a function', () => {
        expect(() => seq.forEach(null)).toThrow(TypeError);
    });

    test('callback should work as intended', () => {
        let result = [];
        seq.forEach(x => result.push(x * x));
        expect(result).toEqual(seq.map(x => x * x).toArray());
    });

    test('correct index should be passed to callback', () => {
        let result = [];
        seq.forEach((x, i) => result.push([x, i]));
        expect(result).toEqual(seq.map((x, i) => [x, i]).toArray());
    });

    test('call/apply invocation should work', () => {
        let result = [];
        const forEach = Seq.prototype.forEach;
        forEach.call(seq, x => result.push(x + 1));
        expect(result).toEqual(seq.map(x => x + 1).toArray());
    });

    test(
        'call/apply invocation on null or undefined seq should throw TypeError',
        () => {
            const forEach = Seq.prototype.forEach;
            expect(() => forEach.call(null)).toThrow(TypeError);
        });

    test('callback is a method of an object', () => {
        const obj = {
            result: [],
            i: 10,
            callback: function (x) {
                this.result.push(x + x);
            },
        };

        seq.forEach(obj.callback, obj);
        expect(obj.result.length).toBe(seq.length);
        expect(obj.result).toEqual(seq.map(x => x + x).toArray());
    });

});