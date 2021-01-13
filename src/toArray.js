import * as util from './util';

/** @module */

/**
 * <h3> toArray() ⇒ SeqCore </h3>
 * Create an array out of the sequence.
 * @return {Array} The result array.
 * @exception {TypeError} if the existing sequence is null or undefined when invoke via call/apply/bind.
 * @example
 *
 * const seq = SeqCore.of(1,2,3,4);
 * const arr = seq.toArray();
 * console.log(arr);
 * // => [1,2,3,4]
 */
function toArray() {
  util.throwIfNull(this, 'this');
  return [...this._generator()];
}

export default toArray;
