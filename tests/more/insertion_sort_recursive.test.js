import Seq from '../../src/main';

describe('recursive insertion sort', () => {

    function insert(x, seq) {
        if (seq.isEmpty()) return Seq.of(x);
        const hd = seq.head();
        const tl = seq.tail();
        if (x <= hd) return tl.prepend([x, hd]);
        else return (insert(x, tl).prepend(hd));
    }

    function sort(seq) {
        if (seq.isEmpty()) return Seq.empty();
        const hd = seq.head();
        const tl = seq.tail();
        return insert(hd, sort(tl));
    }

    test('insertion sort', () => {
        const array = [2, 3, 1, 10, 9, 11];
        const seq = Seq.of(2, 3, 1, 10, 9, 11);
        const sorted = sort(seq).toArray();
        expect(sorted).toEqual(array.sort((x,y) => x -  y));
    });
});
