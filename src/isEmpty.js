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

  if (Array.isArray(this._source) || util.isArrayLike(this._source)) {
    return this._source.length === 0;
  }

  if (this._source.toString() === 'function* () {}') {
    return true;
  }

  const iter = this._generator();
  const item = iter.next();
  return item.done;
}

export default isEmpty;
