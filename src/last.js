import * as util from './util';

/** @module */

/**
 * <h3> last() ⇒ value </h3>
 * Returns the last element of a sequence.
 * @returns The value at the last position in the source sequence.
 * @exception {TypeError} If the source sequence is null or undefined when invoke via call/apply/bind.
 * @example
 * const seq = Seq.range(0,10);
 * const last = seq.last();
 * console.log(last);
 * // => 9
 */
function last() {
  util.throwIfNull(this, 'this');

  if (Array.isArray(this._source) || util.isArrayLike(this._source)) {
    return this._source[this._source.length - 1];
  }
  const iter = this._generator();
  let current = iter.next();
  if (!current.done) {
    let result;
    do {
      result = current.value;
      current = iter.next();
    } while (!current.done);
    return result;
  }
  return undefined;
}

export default last;
