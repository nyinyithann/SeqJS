import * as util from './util';
import from from './from';

/** @module */

/**
 * ### initInfinite(initializer) ⇒ Seq </br>
 * Generate a new sequence by invoking initializer function passed as the argument.
 * The index of the item generated is passed to the initializer function.
 * The iteration can continue up to Number.MAX_SAFE_INTEGER.
 * @param {Function } initializer A function that generates an item in the sequence from a given index.
 * @return {Seq} The result sequence.
 * @exception {TypeError} if initializer is not a function or a generator function.
 * @example
 * const seq = Seq.initInfinite(x => x * 2);
 * const first5Nums = seq.take(5);
 * console.log(first5Nums.toArray());
 * // => [0, 2, 4, 6, 8]
 */

const initInfinite = function (initializer) {
  util.throwIfNotAFunction(initializer, 'initializer');
  util.throwIfGeneratorFunction(initializer, 'initializer');

  let index = 0;

  return from(function* () {
    while (index < Number.MAX_SAFE_INTEGER) {
      yield initializer(index);
      index += 1;
    }
  });
};

export default initInfinite;
