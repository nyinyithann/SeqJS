import * as util from './util';
import from from './from';

/** @module */

/**
 * <h3>reverse() ⇒ Seq</h3>
 * Return a new sequence with the elements in reverse order.
 * @returns {Seq} The reversed sequence.
 * @exception {TypeError} if the source sequence is null or undefined when invoke via call/apply/bind.
 * @example
 * const seq = Seq.of(0, 1, 2, 3, 4);
 * console.log(seq.reverse().toArray());
 * // => [4, 3, 2, 1, 0]
 */
function reverse() {
  util.throwIfNull(this, 'this');

  const source = this._source;

  if (Array.isArray(source) || util.isArrayLike(source)) {
    return from(function* () {
      for (let i = source.length - 1; i >= 0; i -= 1) {
        yield source[i];
      }
    });
  }

  return from([...this].reverse());
}

export default reverse;
