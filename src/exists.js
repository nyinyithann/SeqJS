import * as util from './util';

/** @module */

/**
 * <h3> exists(predicate) ⇒ Seq </h3>
 * Tests if at least one element in the sequence passes the test implemented by the provided function.
 * @param {Function} predicate A function to test on the elements of the seq.
 * @return {boolean} true if the callback function returns a truthy value for at least one element in the sequence. Otherwise, false.
 * @exception If the source sequence is null or undefined when invoke via call/apply/bind; or predicate is a generator function or not a function.
 * @example
 * const seq = Seq.of(1,2,3,4,5);
 * const result = seq.exists(x => x % 2 === 0);
 * console.log(result);
 * // => true
 */
function exists(predicate) {
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

export default exists;
