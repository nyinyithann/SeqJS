import * as util from './util';
import from from './from';

/** @module */

/**
 * <h3>prepend([val1[,val2[,...[,valN]]]]) ⇒ Seq</h3>
 * Creates a new sequence with new values prepended.
 * @param others Iterable, iterator, generator function, array-like object, or single value to prepend into new sequence. If omitted, the method
 * returns the existing sequence.
 * @returns {Seq} A new sequence.
 * @exception {TypeError} if the existing sequence is null or undefined when invoke via call/apply/bind.
 * @example
 * const seq = Seq.of(4,5);
 * const prepended = seq.prepend([1,2], { three : 3 });
 * console.log(prepended.toArray());
 * // => [ 1, 2, { three: 3 }, 4, 5]
 */
function prepend(...others) {
  util.throwIfNull(this, 'this');

  if (others.length === 0) {
    return this;
  }

  const thisIter = this._generator();
  return from(function* () {
    for (let i = 0; i < others.length; i += 1) {
      const item = others[i];
      if (util.isGeneratorFunction(item)) {
        yield* item();
      } else if (util.isIterable(item)) {
        yield* item[Symbol.iterator]();
      } else if (util.isArrayLike(item)) {
        for (let j = 0; j < item.length; j += 1) {
          yield item[j];
        }
      } else {
        yield item;
      }
    }
    yield* thisIter;
  });
}

export default prepend;
