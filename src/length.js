import * as util from './util';

/** @module */

/**
 * <hr style="border:2px solid gray"> </hr>
 * <h3> length ⇒ Number </h3>
 * Returns the length of the sequence.
 * @return {number} The length of the sequence.
 * @exception {TypeError} if the source sequence is null or undefined.
 * @example
 * const seq = Seq.of(1,2,3);
 * console.log(seq.length);
 * // => 3;
 */
function length() {
  util.throwIfNull(this, 'this');

  if (Array.isArray(this._source)) {
    return this._source.length;
  }
  let count = 0;
  const iter = this._generator();
  while (!iter.next().done) {
    count += 1;
  }
  return count;
}

export default length;
