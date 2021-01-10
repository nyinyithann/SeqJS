import * as util from './util';

/** @module */

/**
 * <h3>forall(predicate) ⇒ Seq</h3>
 * Tests if all elements of the sequence satisfy the given predicate.
 * @param {Function} predicate A function to test on the elements of the seq.
 * @return {boolean} true if the callback function returns a truthy value for at least one element in the sequence. Otherwise, false.
 * @exception If the source sequence is null or undefined; or predicate is a generator function or not a function.
 * @example
 * const seq = Seq.of(2, 4, 5, 8);
 * const result = seq.exists(x => x % 2 === 0);
 * console.log(result);
 * // => true
 */
function forall(predicate) {
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
    if (!predicate.call(thisArg, current.value)) {
      return false;
    }
    current = iter.next();
  }
  return true;
}

export default forall;
