import * as util from './util';

/** @module */

/**
 * <h3> reduce(reducer) ⇒ Any </h3>
 * The method executes the provided reducer function on each element of the sequence, resulting in single output value.
 * @param reducer {Function} It takes two arguments - (accumulator, currentValue). if initialValue is provided, the value will be used as the first argument in the reducer.
 * Otherwise; the first element of the sequence will be used as the first argument.
 * @return A single value that results from reduction.
 * @exception {TypeError} If the source sequence is null or undefined when invoke via call/apply/bind; or reducer is a generator function or not a function; or when the source sequence is empty and initial value is not provided.
 *
 * @example
 * const result = Seq.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).reduce((accumulator, currentValue) => accumulator + currentValue);
 * console.log(result);
 * // => 55
 *
 * const result = Seq.of([0, 1], [2, 3], [4, 5]).reduce((accumulator, currentValue) => accumulator.concat(currentValue) , []);
 * console.log(result);
 * // => [0, 1, 2, 3, 4, 5]
 */
function reduce(reducer) {
  util.throwIfNull(this, 'this');
  util.throwIfNotAFunction(reducer, 'reducer');
  util.throwIfGeneratorFunction(reducer, 'reducer');

  let initialValue;

  if (arguments.length > 1) {
    initialValue = arguments[1];
  }

  const iter = this._generator();
  let current = iter.next();
  if (current.done) {
    if (initialValue) {
      return initialValue;
    }
    throw new TypeError('Reduce of empty sequence with no initial value.');
  }
  let state;
  if (initialValue) {
    state = reducer(initialValue, current.value);
  } else {
    state = current.value;
  }
  current = iter.next();
  while (!current.done) {
    state = reducer(state, current.value);
    current = iter.next();
  }
  return state;
}

export default reduce;
