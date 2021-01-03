import * as util from './util';

/** @module */

/**
 * <hr style="border:2px solid gray"> </hr>
 * <h3> isEmpty() ⇒ Boolean </h3>
 * Returns true if the sequence contains no elements, false otherwise.
 * @return {boolean} True if the sequence is empty; false otherwise.
 * @exception {TypeError} if the source sequence is null or undefined.
 * @example
 * console.log(Seq.empty().isEmpty());
 * // => true
 */
const isEmpty = function () {
  util.throwIfNull(this, 'this');
  return this._generator().next().done;
};

export default isEmpty;
