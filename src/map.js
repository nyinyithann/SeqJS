import * as util from './util';
import from from './from';

/** @module */

/**
 * <h3> map(mapper) ⇒ Seq </h3>
 * The map method creates a new Seq populated with the results of calling a provided function on forall element.
 * The provided function is invoked with two arguments: (item, index).
 *
 * @param {Function} mapper The function invoked on each item.
 * @return {Seq} Return the new mapped sequence.
 * @exception {TypeError} If the source sequence is null or undefined when invoke via call/apply/bind; or mapper is a generator function or not a function.
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
function map(mapper) {
  util.throwIfNull(this, 'this');
  util.throwIfNotAFunction(mapper, 'mapper');
  util.throwIfGeneratorFunction(mapper, 'mapper');

  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  const iter = this._generator();

  const getMapIterator = () => {
    let index = -1;
    return {
      [Symbol.iterator]() {
        return {
          next() {
            const item = iter.next();
            if (!item.done) {
              index += 1;
              return { value: mapper.call(thisArg, item.value, index), done: false };
            }
            return this.reset(undefined);
          },
          return(value) {
            return this.reset(value);
          },
          reset(value) {
            if (util.isFunction(iter.return)) {
              iter.return(value);
            }
            index = -1;
            return { value, done: true };
          },
        };
      },
    };
  };

  return from(getMapIterator());
}

export default map;
