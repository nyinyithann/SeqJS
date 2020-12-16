import Seq from '../src/seq';

describe("reduce()", () => {
   test("initial value should be returned if seq is empty.", () => {
        expect(Seq.of().reduce((x,y) => x + y, 10)).toBe(10);
   });

    test("initial value is not provided and sequence contains only one element. The element will be returned.", () => {
        expect(Seq.of(1).reduce((x,y) => x + y)).toBe(1);
    });

    test('sum of 1 to 10.', () => {
       expect(Seq.of(1,2,3,4,5,6,7,8,9,10).reduce((acc, val) => acc + val)).toBe(55);
    });

    test('flatten array.', () => {
        const flatArray = Seq.of([0, 1], [2, 3], [4, 5]).reduce((accumulator, currentValue) => accumulator.concat(currentValue) , []);
        expect(flatArray).toEqual([0,1,2,3,4,5]);
    });

    test('function composition.', () => {
        const double = x => x + x;
        const triple = x => 3 * x
        const pipe = (...funcs) => input => funcs.reduce((acc, fn) => fn(acc), input);
        const multiply6 = pipe(double, triple);
        expect(multiply6(6)).toBe(36);
    });

    test('throws error if sequence is empty and no initial value is provided.', () => {
       const seq = new Seq();
       expect( () => seq.reduce((x, y) => x + y)).toThrow('Reduce of empty sequence with no initial value.');
    });

    test('prototype method.', () => {
       const seqReduce = Seq.prototype.reduce;
       const result = seqReduce.call(new Seq([1, 2, 3]), (x, y) => x + y);
       expect(result)
       .toBe(6);
    });

    test('initial value is provided. seq has only one element.', () => {
       const expected = Seq.of(1).reduce((x, y) => x + y, 10);
       expect(expected).toBe( [1].reduce((x,y) => x + y, 10) );
    });

    test('map using reduce.', () => {
        const map = function (iterable, func) {
            const seq = new Seq(iterable);
            return seq.reduce((acc, cv) => acc.concat(func(cv)), new Seq());
        };
        const nums = [1,2,3,4];
        const callback = x => x + x;
        const mappedSeq = map(nums, callback);
        expect([...mappedSeq]).toEqual(nums.map(callback));
    });

    test('filter using reduce.', () => {
        const filter = function(iterable, predicate) {
            const seq = new Seq(iterable);
            return seq.reduce((acc, cv) => {
                if (predicate(cv)) {
                    acc = acc.concat(cv);
                }
                return acc;
            }, new Seq());
        };
        const nums = [1,2,3,4];
        const predicate = x => x % 2 == 0;
        const filteredSeq = filter(new Seq(nums), predicate);
        expect([...filteredSeq]).toEqual(nums.filter(predicate));
    });

});