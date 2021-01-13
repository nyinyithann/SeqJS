import * as util from './util';

/** @module */

/**
 * Returns the first element of the sequence.
 * @returns The first element of the sequence.
 * @example @exception {TypeError} If the source sequence is null or undefined when invoke via call/apply/bind.
 * const seq = SeqCore.of(1, 2, 3, 4, 5);
 * console.log(seq.head());
 * // => 1
 */
function head() {
  util.throwIfNull(this, 'this');

  const iter = this._generator();
  const current = iter.next();
  iter.return();
  return current.value;
}

export default head;
