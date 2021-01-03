import Seq from './seq';

/** @module */

/**
 * ### Seq.of(elem0[elem1[,...[,elemN]]]) ⇒ Seq </br>
 * Creates a new sequence from a variable number of arguments, regardless of number or type of the arguments.
 * @param args Elements used to create the sequence.
 * @returns {Seq} A new sequence.
 * @example
 * const nums = Seq.of(1,2, { 'three' : 3}, [4], '5', 0b110);
 * console.log(nums);
 * // => [ 1, 2, { three: 3 }, [ 4 ], '5', 6 ]
 */
export default function of(...args) {
  return new Seq(args);
}
