import * as util from './util';

/** @module */

/**
 * <h3> findBack(predicate) ⇒ SeqCore </h3>
 * Returns the last element of a sequence that satisfies a specified condition.
 * @param predicate A function to test each element for a condition.
 * @returns The last element in the sequence that passes the test in the specified predicate function.
 * @exception {TypeError} If the source sequence is null or undefined when invoke via call/apply/bind; or predicate is a generator function or not a function.
 * @example
 * const seq = SeqCore.of(1, 2, 42, 323, 423, 32, 23, 10, 11);
 * console.log(seq.findBack(x => x % 2 === 0));
 * // => 10
 */
function findBack(predicate) {
  util.throwIfNull(this, 'this');
  util.throwIfNotAFunction(predicate, 'predicate');
  util.throwIfGeneratorFunction(predicate, 'predicate');

  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  if (Array.isArray(this._source) || util.isArrayLike(this._source)) {
    for (let i = this._source.length - 1; i >= 0; i -= 1) {
      const item = this._source[i];
      if (predicate.call(thisArg, item)) {
        return item;
      }
    }
  }

  const iter = this._generator();
  let current = iter.next();
  if (!current.done) {
    let result;
    do {
      if (predicate.call(thisArg, current.value)) {
        result = current.value;
        current = iter.next();
        while (!current.done) {
          if (predicate.call(thisArg, current.value)) {
            result = current.value;
          }
          current = iter.next();
        }
        return result;
      }
      current = iter.next();
    } while (!current.done);
  }
  return undefined;
}

export default findBack;
