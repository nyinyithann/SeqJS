import * as util from './util';
import from from './from';

/** @module */

/**
 * <h3> takeWhile(predicate) ⇒ SeqCore </h3>
 * Returns a sequence that, when iterated, yields elements of the underlying sequence while the given predicate returns True, and then returns no further elements.
 * @param {Function} predicate A function that evaluates to false when no more items should be returned.
 * @return {Seq} The result sequence.
 * @exception {TypeError} If the source sequence is null or undefined when invoke via call/apply/bind; or predicate is a generator function or not a function.
 * @example
 * const seq = SeqCore.from([1, 2, 3, 1, 2, 3]);
 * const result = seq.takeWhile(x => x < 3).toArray();
 * console.log(result);
 * => [1, 2]
 */
function takeWhile(predicate) {
  util.throwIfNull(this, 'this');
  util.throwIfNotAFunction(predicate, 'predicate');
  util.throwIfGeneratorFunction(predicate, 'predicate');

  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  const iter = this._generator();
  let current = iter.next();
  return from(function* () {
    while (!current.done && predicate.call(thisArg, current.value)) {
      yield current.value;
      current = iter.next();
    }
  });
}

export default takeWhile;
