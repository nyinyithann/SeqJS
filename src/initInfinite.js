import * as util from './util';
import from from './from';

/** @module */

/**
 * <h3> initInfinite(initializer) ⇒ Seq </h3>
 * Generate a new sequence by invoking initializer function passed as the argument.
 * The index of the item generated is passed to the initializer function.
 * The iteration can continue up to Number.MAX_SAFE_INTEGER.
 * @param {Function } initializer A function that generates an item in the sequence from a given index.
 * @return {Seq} The result sequence.
 * @exception {TypeError} if initializer a generator function or not a function.
 * @example
 * const seq = Seq.initInfinite(x => x * 2);
 * const first5Nums = seq.take(5);
 * console.log(first5Nums.toArray());
 * // => [0, 2, 4, 6, 8]
 */

function initInfinite(initializer) {
  util.throwIfNotAFunction(initializer, 'initializer');
  util.throwIfGeneratorFunction(initializer, 'initializer');

  const createInfiniteIterator = () => {
    let index = -1;
    return {
      [Symbol.iterator]() {
        return {
          next() {
            index += 1;
            if (index < Number.MAX_SAFE_INTEGER) {
              return { value: initializer(index), done: false };
            }
            return this.reset(undefined);
          },
          return(value) {
            return this.reset(value);
          },
          reset(value) {
            index = -1;
            return { value, done: true };
          },
        };
      },
    };
  };

  return from(createInfiniteIterator());
}

export default initInfinite;
