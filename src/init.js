import * as util from './util';
import from from './from';
import empty from './empty';

/** @module */

/**
 * <h3> init(count, initializer) ⇒ Seq </h3>
 * Generate a new sequence by invoking initializer function passed as the argument up to the given count.
 * @param {Number} count The maximum number of items to generate for the sequence.
 * @param {Function } initializer A function that generates an item in the sequence from a given index.
 * @return {Seq} The result sequence.
 * @exception {TypeError} if count is a negative number; or initializer is a generator function or not a function.
 * @example
 * const fiveNums = Seq.init(5, x => x * 2);
 * console.log(fiveNums.toArray());
 * // => [0, 2, 4, 6, 8]
 */
function init(count, initializer) {
  util.throwIfNegativeNumber(count, 'count');
  util.throwIfNotAFunction(initializer, 'initializer');
  util.throwIfGeneratorFunction(initializer, 'initializer');

  if (count === 0) {
    return empty();
  }

  return from(function* () {
    for (let i = 0; i < count; i += 1) {
      yield initializer(i);
    }
  });
}

export default init;
