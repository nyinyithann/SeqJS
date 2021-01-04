import * as util from './util';
import from from './from';

/** @module */

/**
 * <hr style="border:2px solid gray"> </hr>
 * <h3> map(callback) ⇒ Seq </h3>
 * The map method creates a new Seq populated with the results of calling a provided function on every element.
 * The provided function is invoked with two arguments: (item, index).
 *
 * @param {Function} callback The function invoked on each item.
 * @return {Seq} Return the new mapped sequence.
 * @exception {TypeError} If the source sequence is null or undefined; or callback is a not a function or a generator function.
 * @example
 *
 * const seq = Seq.of(1,2,3,4,5).map(x => x * x);
 * console.log([...seq]);
 * // => [1, 4, 9, 16, 25]
 *
 * const seq = Seq.of(1,2,3,4,5).map((item, index) => [index, item]);
 * console.log([...seq]);
 * // => [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]]
 */
function map(callback) {
  util.throwIfNull(this, 'this');
  util.throwIfNotAFunction(callback, 'callback');
  util.throwIfGeneratorFunction(callback, 'callback');

  let index = 0;
  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  const iter = this._generator();
  return from(function* () {
    let item = iter.next();
    while (!item.done) {
      yield callback.call(thisArg, item.value, index);
      item = iter.next();
      index += 1;
    }
  });
}

export default map;
