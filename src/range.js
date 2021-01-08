import * as util from './util';
import from from './from';

/** @module */

/**
 * <h3>Seq.range(begin, end, step) ⇒ Seq</h3>
 * Creates a sequence of numbers starting from 'begin' to 'end', but not including, 'end'.
 * If 'end' is not defined, it is set to 'begin', and 'begin' is then set to 0.
 * 'step' will be assigned to -1 if 'begin' is negative and 'end' is not defined.
 * @param {number} [begin = 0] The first number of the sequence
 * @param {number} end The end of the range of numbers. It won't include in the result sequence.
 * @param {number} [step = 1] The value to increment or decrement by.
 * @returns {Seq} The result sequence.
 * @exception {TypeError} if 'begin', 'end', and 'step' are not finite numbers when passed.
 * @example
 * console.log(Seq.range(5).toArray());
 * // => [ 0, 1, 2, 3, 4 ]
 *
 * console.log(Seq.range(-5).toArray());
 * // => [ 0, -1, -2, -3, -4 ]
 *
 * console.log(Seq.range(1,5).toArray());
 * // => [ 1, 2, 3, 4 ]
 *
 * console.log(Seq.range(0, 20, 5).toArray());
 * // => [ 0, 5, 10, 15 ]
 *
 * console.log(Seq.range(0, -5, -1).toArray());
 * // => [ 0, -1, -2, -3, -4 ]
 *
 * console.log(Seq.range(0).toArray());
 * // => []
 *
 * console.log(Seq.range(10, -5, -1).toArray());
 * // => [ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4 ]
 *
 * console.log(Seq.range(-1, -2, -5).toArray());
 * // => [-1]
 */
function range(begin, end, step) {
  /* eslint no-param-reassign : 0 */
  util.throwIfNotAFiniteNumber(begin, 'begin');
  if (end === undefined) {
    end = begin;
    begin = 0;
  } else {
    util.throwIfNotAFiniteNumber(end, 'end');
  }
  if (step === undefined) {
    step = begin < end ? 1 : -1;
  } else {
    util.throwIfNotAFiniteNumber(step, 'step');
  }

  const createRangeIterator = (b, e, s) => {
    let ob = b;
    const getLength = () => Math.max(Math.ceil((e - b) / (s || 1)), 0);

    return {
      [Symbol.iterator]() {
        return {
          minusFactor: 0,
          next() {
            if ((getLength() - this.minusFactor) > 0) {
              const res = { value: ob, done: false };
              ob += s;
              this.minusFactor += 1;
              return res;
            }
            ob = b;
            this.minusFactor = 0;
            return { done: true };
          },
          return() {
            this.minusFactor = 0;
            return { done: true };
          },
        };
      },
    };
  };

  return from(createRangeIterator(begin, end, step));
}

export default range;
