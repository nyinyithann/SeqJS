import * as util from './util';
import from from './from';

/** @module */

/**
 * <h3>append([val1[,val2[,...[,valN]]]]) ⇒ Seq</h3>
 * Creates a new sequence that appends the passed value to the existing seq. This method does not change the existing sequence.
 * @param others Iterable, iterator, generator function, array-like object, or single value to concatenate into new sequence. If omitted, the method
 * returns the existing sequence.
 * @return {Seq} A new sequence.
 * @exception {TypeError} if the existing sequence is null or undefined when invoke via call/apply/bind.
 * @example
 * const seq = Seq.of(1, 2, 3);
 * const result = seq.append([4, 5, 6], { seven: 7 }, [[8], [9]], [[[10], [11]]]);
 * console.log(result.toArray());
 * // => [ 1, 2, 3, 4, 5, 6, { seven: 7 }, [ 8 ], [ 9 ], [ [ 10 ], [ 11 ] ] ]
 *
 */
function append(...others) {
  util.throwIfNull(this, 'this');

  if (others.length === 0) {
    return this;
  }

  const thisIter = this._generator();
  return from(function* () {
    yield* thisIter;
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
  });
}

export default append;
