import Seq from '../src/seq';

describe("reduce()", () => {
   test("initial value should be returned if seq is empty.", () => {
        expect(Seq.of().reduce((x,y) => x + y, 10)).toBe(10);
   });

    test("first element should be returned if initial value is not provided and sequence contains only one element.", () => {
        expect(Seq.of(1).reduce((x,y) => x + y, 10)).toBe(1);
    });

    test('sum of 1 to 10.', () => {
       expect(Seq.of(1,2,3,4,5,6,7,8,9,10).reduce((acc, val) => acc + val)).toBe(55);
    });

    test('flatten array.', () => {
        const flatArray = Seq.of([0, 1], [2, 3], [4, 5]).reduce((accumulator, currentValue) => accumulator.concat(currentValue) , []);
        expect(flatArray.join()).toBe([0,1,2,3,4,5].join());
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
});