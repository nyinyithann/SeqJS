import * as util from './util';
import from from './from';
import empty from './empty';

/** @module */

/**
 * ### take(count) ⇒ Seq </br>
 * Returns the first N elements of the sequence.
 * @param count The number of items to take.
 * @return {Seq} The result sequence.
 * @exception {TypeError} if the source sequence is null or undefined; or count is a negative number.
 * @example
 * const seq = Seq.of(1,2,3,4,5);
 * const taken = seq.take(2);
 * console.log([...taken]);
 * // => [1, 2]
 */
const take = function (count) {
  util.throwIfNull(this, 'this');
  util.throwIfNegativeNumber(count, 'count');

  if (count === 0) {
    return empty();
  }
  let current;
  const iter = this._generator();
  return from(function* () {
    for (let i = 0; i < count; i += 1) {
      current = iter.next();
      if (!current.done) {
        yield current.value;
      }
    }
  });
};

export default take;
