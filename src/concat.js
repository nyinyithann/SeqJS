import * as util from './util';
import from from './from';

/** @module */

/**
 * <h3>concat([val1[,val2[,...[,valN]]]]) ⇒ Seq </h3>
 * Creates a new seq that appends the passed value to the existing seq. This method does not change the existing sequence.
 * @param others Iterable, iterator, generator function or single value to concatenate into new sequence. If omitted, the method
 * returns the existing sequence.
 * @return {Seq} A new sequence.
 * @exception {TypeError} if the existing sequence is null or undefined.
 * @example
 * const seq = Seq.of(1, 2, 3);
 * const result = seq.concat([4, 5, 6], { seven: 7 }, [[8], [9]], [[[10], [11]]]);
 * console.log(result.toArray());
 * // => [ 1, 2, 3, 4, 5, 6, { seven: 7 }, [ 8 ], [ 9 ], [ [ 10 ], [ 11 ] ] ]
 *
 */
function concat(...others) {
  util.throwIfNull(this, 'this');

  if (others.length === 0) {
    return this;
  }

  const thisIter = this._generator();
  return from(function* () {
    yield* thisIter;
    for (let i = 0; i < others.length; i += 1) {
      if (util.isGeneratorFunction(others[i])) {
        yield* others[i]();
      } else if (util.isIterable(others[i])) {
        yield* others[i][Symbol.iterator]();
      } else {
        yield others[i];
      }
    }
  });
}

export default concat;
