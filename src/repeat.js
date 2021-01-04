import * as util from './util';
import from from './from';
import empty from './empty';

/** @module */

/**
 * <hr style="border:2px solid gray"> </hr>
 * <h3> repeat(count, initial) ⇒ Seq </h3>
 * Creates a sequence by replicating the given initial value.
 * @param {Number} count The number of elements to replicate.
 * @param initial The value to replicate.
 * @return {Seq} The generated sequence.
 * @exception {TypeError} if count is a negative number.
 * @example
 * const seq = Seq.repeat(5, 1);
 * console.log(seq.toArray());
 * // => [1, 1, 1, 1, 1]
 */

function repeat(count, initial) {
  util.throwIfNegativeNumber(count, 'count');

  if (count === 0) {
    return empty();
  }

  return from(function* () {
    for (let i = 0; i < count; i += 1) {
      yield initial;
    }
  });
}

export default repeat;
