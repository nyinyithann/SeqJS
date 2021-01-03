import * as util from './util';

/** @module */

/**
 * ### forEach(callback) ⇒ undefined </br>
 * Applies the given function to each element of the collection.
 * @param  {Function} callback A function to apply to each element of the sequence.
 * @exception {TypeError} If the source sequence is null or undefined; or predicate is not a function or a generator function.
 * @example
 *
 * const seq = Seq.of(1, 2, 3, 4, 5);
 * seq.forEach(x => console.log(x));
 * // =>   1
 * // =>   2
 * // =>   3
 * // =>   4
 * // =>   5
 */
const forEach = function (callback) {
  util.throwIfNull(this, 'this');
  util.throwIfNotAFunction(callback, 'callback');
  util.throwIfGeneratorFunction(callback, 'callback');

  let index = 0;
  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  const iter = this._generator();
  let current = iter.next();
  while (!current.done) {
    callback.call(thisArg, current.value, index);
    current = iter.next();
    index += 1;
  }
};

export default forEach;
