import * as util from './util';
import empty from './empty';
import from from './from';

/** @module */

/**
 * Returns a new sequence containing all the elements of the existing sequence except the first.
 * @returns {Seq} The result sequence.
 * @example @exception {TypeError} If the source sequence is null or undefined when invoke via call/apply/bind.
 * const seq = Seq.of(1, 2, 3, 4, 5);
 * console.log(seq.tail().toArray());
 * // => [2, 3, 4, 5]
 */
function tail() {
  util.throwIfNull(this, 'this');

  const iter = this._generator();
  let current = iter.next();
  if (current.done) {
    return empty();
  }

  current = iter.next();

  return from(function* () {
    while (!current.done) {
      yield current.value;
      current = iter.next();
    }
  });
}

export default tail;
