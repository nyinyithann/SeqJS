import * as util from './util';
import from from './from';
import empty from './empty';

/** @module */

/**
 * <h3> take(count) ⇒ SeqCore </h3>
 * Returns the first N elements of the sequence.
 * @param count The number of items to take.
 * @return {Seq} The result sequence.
 * @exception {TypeError} if the source sequence is null or undefined when invoke via call/apply/bind; or count is a negative number.
 * @example
 * const seq = SeqCore.of(1,2,3,4,5);
 * const taken = seq.take(2);
 * console.log([...taken]);
 * // => [1, 2]
 */
function take(count) {
  util.throwIfNull(this, 'this');
  util.throwIfNegativeNumber(count, 'count');

  if (count === 0) {
    return empty();
  }

  const createTakeIterator = (c, iter) => {
    let innerCount = c;
    return {
      [Symbol.iterator]() {
        return {
          next() {
            if (innerCount > 0) {
              innerCount -= 1;
              return iter.next();
            }
            return this.reset(undefined);
          },
          return(value) {
            return this.reset(value);
          },
          reset(value) {
            innerCount = c;
            iter.return();
            return { value, done: true };
          },
        };
      },
    };
  };

  return from(createTakeIterator(count, this._generator()));
}

export default take;
