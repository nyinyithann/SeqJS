import * as util from './util';

/** @module */

/**
 * <hr style="border:2px solid gray"> </hr>
 * <h3> some(predicate) ⇒ Seq </h3>
 * Tests if at least one element in the sequence passes the test implemented by the provided function.
 * @param {Function} predicate A function to test on the elements of the seq.
 * @return {boolean} true if the callback function returns a truthy value for at least one element in the sequence. Otherwise, false.
 * @exception If the source sequence is null or undefined; or predicate is not a function or a generator function.
 * @example
 * const seq = Seq.of(1,2,3,4,5);
 * const result = seq.some(x => x % 2 === 0);
 * console.log(result);
 * // => true
 */
function some(predicate) {
  util.throwIfNull(this, 'this');
  util.throwIfNotAFunction(predicate, 'predicate');
  util.throwIfGeneratorFunction(predicate, 'predicate');

  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  const iter = this._generator();
  let current = iter.next();
  while (!current.done) {
    if (predicate.call(thisArg, current.value)) {
      return true;
    }
    current = iter.next();
  }
  return false;
}

export default some;
