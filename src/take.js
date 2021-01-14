import * as util from './util';
import from from './from';
import empty from './empty';

/** @module */

/**
 * <h3> take(count) ⇒ Seq </h3>
 * Returns the first N elements of the sequence.
 * @param count The number of items to take.
 * @return {Seq} The result sequence.
 * @exception {TypeError} if the source sequence is null or undefined when invoke via call/apply/bind; or count is a negative number.
 * @example
 * const seq = Seq.of(1,2,3,4,5);
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

  const iter = this[Symbol.iterator]();
  const createTakeIterator = () => {
    let innerCount = count;
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
            innerCount = count;
            if (util.isFunction(iter.return)) {
              iter.return(value);
            }
            return { value, done: true };
          },
        };
      },
    };
  };

  return from(createTakeIterator());
}

export default take;
