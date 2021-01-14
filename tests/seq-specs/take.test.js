import initInfinite from '../../src/seq/initInfinite';
import take from '../../src/seq/take';

describe('take()', () => {
   test('general', () => {
       const seq = take(5, initInfinite(x => x ));
       // let stop = 1;
       // for (const _ of seq) {
       //     if (stop === 2) {
       //         break;
       //     }
       //     stop += 1;
       // }
       expect([...take(2, seq)]).toEqual([0, 1]);
       const actual = [...take(5, seq)];
       const expected = [...take(5, seq)];
       expect(actual).toEqual(expected);
   });
});
