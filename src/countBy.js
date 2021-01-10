import * as util from './util';
import from from './from';

/** @module */

/**
 * * <h3> countBy(projection) ⇒ Seq </h3>
 * Applies a key-generating function to each element of a sequence and returns a sequence yielding unique keys and their number of occurrences in the original sequence.
 * This method should not be used with large or infinite sequences.
 * @param projection A function transforming each item of the input sequence into a key to be compared against the others.
 * @returns {Seq} The result sequence.
 * @exception  {TypeError} If the source sequence is null or undefined when invoke via call/apply/bind; or projection is a generator function or not a function.
 * @example
 * class Person {
 *   constructor(name) {
 *     this.Name = name;
 *   }
 * }
 * const mrA = new Person('A', 20);
 * const mrB = new Person('B', 15);
 * const seq = Seq.of(mrA, mrA, mrB);
 * const nameCounts = seq.countBy(x => x.Name).toArray();
 * console.log(nameCounts)
 * // => [['A', 2], ['B', 1]]
 */
function countBy(projection) {
  util.throwIfNull(this, 'this');
  util.throwIfNotAFunction(projection, 'projection');
  util.throwIfGeneratorFunction(projection, 'projection');

  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  const map = new Map();

  const iter = this._generator();
  let current = iter.next();
  while (!current.done) {
    const currentValue = current.value;
    const key = projection.call(thisArg, currentValue);
    map.set(key, (map.get(key) || 0) + 1);
    current = iter.next();
  }

  return from(map.entries());
}

export default countBy;
