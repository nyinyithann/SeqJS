import * as util from './util';
import from from './from';

/** @module */

/**
 * <h3>filter(predicate) ⇒ Seq</h3>
 * Returns a new sequence containing only the elements of the collection for which the given predicate returns "true".
 * @param {Function} predicate A function to test whether each item in the input sequence should be included in the output.
 * @return {Seq} The result sequence.
 * @exception {TypeError} If the source sequence is null or undefined when invoke via call/apply/bind; or predicate is a generator function or not a function.
 * @example
 *
 * const seq = Seq.of(1,2,3,4,5).filter(x => x % 2 === 0);
 * console.log([...seq]);
 * // => [2, 4]
 */
function filter(predicate) {
  util.throwIfNull(this, 'this');
  util.throwIfNotAFunction(predicate, 'predicate');
  util.throwIfGeneratorFunction(predicate, 'predicate');

  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  const iter = this._generator();
  return from(function* () {
    let current = iter.next();
    while (!current.done) {
      if (predicate.call(thisArg, current.value)) {
        yield current.value;
      }
      current = iter.next();
    }
  });
}

export default filter;
