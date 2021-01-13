import * as util from './util';
import from from './from';
import empty from './empty';

/** @module */

/**
 * <h3> Seq.replicate(count, initial) ⇒ Seq </h3>
 * Creates a sequence by replicating the given initial value.
 * @param {Number} count The number of elements to replicate.
 * @param initial The value to replicate.
 * @return {Seq} The generated sequence.
 * @exception {TypeError} if count is a negative number.
 * @example
 * const seq = Seq.replicate(5, 1);
 * console.log(seq.toArray());
 * // => [1, 1, 1, 1, 1]
 */

function replicate(count, initial) {
  util.throwIfNegativeNumber(count, 'count');

  if (count === 0) {
    return empty();
  }

  const getReplicateIterator = () => {
    let index = 0;
    return {
      [Symbol.iterator]() {
        return {
          next() {
            if (index < count) {
              index += 1;
              return { value: initial, done: false };
            }
            return this.reset(undefined);
          },
          return(value) {
            return this.reset(value);
          },
          reset(value) {
            index = 0;
            return { value, done: true };
          },
        };
      },
    };
  };

  return from(getReplicateIterator());
}

export default replicate;
