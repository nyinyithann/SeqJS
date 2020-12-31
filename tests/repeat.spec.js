import Seq from '../src/seq';

describe('repeat()', () => {
    test('should generate a new sequence based on the params pass', () => {
        expect(Seq.repeat(5, 1).toArray()).toEqual([1, 1, 1, 1, 1]);
        const funcSeq = Seq.repeat(2, x => x);
        let acc = 0;
        funcSeq.forEach(f => acc += f(1));
        expect(acc).toBe(2);

        expect(Seq.repeat(2, null).toArray()).toEqual([null, null]);
        expect(Seq.repeat(2, undefined).toArray()).
            toEqual([undefined, undefined]);
    });

    test('should return an empty sequence if count is zero', () => {
        expect(Seq.repeat(0, 1).isEmpty()).toBe(true);
    });

    test('should throw TypeError if count is a negative number', () => {
        expect(() => Seq.repeat(-1, 1)).toThrow(TypeError);
    });
});