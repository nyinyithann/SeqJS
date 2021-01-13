import * as util from './util';

function item(index) {
  util.throwIfNull(this, 'this');
  util.throwIfNegativeNumber(index, 'index');

  function nth(n, seq) {
    const current = seq.next();
    if (current.done) {
      const shortBy = n + 1;
      throw new Error(`The sequence has an insufficient number of elements. It's short by ${shortBy} elements.`);
    }
    if (n === 0) {
      seq.return();
      return current.value;
    }
    return nth(n - 1, seq);
  }

  return nth(index, this._generator());
}

export default item;
