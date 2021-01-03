import * as util from './util';

/** @module */

/**
 * <hr style="border:2px solid gray"> </hr>
 * <h3> toArray() ⇒ Seq </h3>
 * Create an array out of the sequence.
 * @return {Array} The result array.
 * @exception {TypeError} If the source sequence is null or undefined.
 * @example
 *
 * const seq = Seq.of(1,2,3,4);
 * const arr = seq.toArray();
 * console.log(arr);
 * // => [1,2,3,4]
 */
const toArray = function () {
  util.throwIfNull(this, 'this');
  return [...this._generator()];
};

export default toArray;
