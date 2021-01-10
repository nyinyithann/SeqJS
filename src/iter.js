import * as util from './util';

/** @module */

/**
 * <h3> iter(callback) ⇒ undefined </h3>
 * Applies the given function to each element of the collection.
 * @param  {Function} callback A function to apply to each element of the sequence.
 * @exception {TypeError} If the source sequence is null or undefined when invoke via call/apply/bind; or predicate is a generator function or not a function.
 * @example
 *
 * const seq = Seq.of(1, 2, 3, 4, 5);
 * seq.iter(x => console.log(x));
 * // =>   1
 * // =>   2
 * // =>   3
 * // =>   4
 * // =>   5
 */
function iter(callback) {
  util.throwIfNull(this, 'this');
  util.throwIfNotAFunction(callback, 'callback');
  util.throwIfGeneratorFunction(callback, 'callback');

  let index = 0;
  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  const gen = this._generator();
  let current = gen.next();
  while (!current.done) {
    callback.call(thisArg, current.value, index);
    current = gen.next();
    index += 1;
  }
}

export default iter;
