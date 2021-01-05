import * as util from './util';

/** @module */

/**
 * <h3> isEmpty() ⇒ Boolean </h3>
 * Returns true if the sequence contains no elements, false otherwise.
 * @return {boolean} True if the sequence is empty; false otherwise.
 * @exception {TypeError} if the existing sequence is null or undefined when invoke via call/apply/bind.
 * @example
 * console.log(Seq.empty().isEmpty());
 * // => true
 */
function isEmpty() {
  util.throwIfNull(this, 'this');
  return this._generator().next().done;
}

export default isEmpty;
