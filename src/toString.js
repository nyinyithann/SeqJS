import * as util from './util';

/** @module */
/**
 * <h3> toString() ⇒ string </h3>
 * Returns a string representing upto 128 elements of the sequence. If the sequence contains
 * more than 128 elements, the string will end with '...'.
 * @returns A string representing the elements of the sequence.
 * @exception {TypeError} If the source sequence is null or undefined when invoke via call/apply/bind.
 * @example
 * console.log(Seq.of(1,2,3).toString());
 * // => "1, 2, 3"
 */
function toString() {
  util.throwIfNull(this, 'this');

  let count = 128;
  const array = [];
  const iter = this._generator();
  let current = iter.next();
  if (current.done) {
    return '';
  }
  while (count > 0 && !current.done) {
    array.push(current.value);
    count -= 1;
    current = iter.next();
  }

  const res = array.join(', ');
  // eslint-disable-next-line no-nested-ternary
  return count > 0
    ? res
    : current.done
      ? res
      : `${res},...`;
}

export default toString;
