import Seq from './seq';

/** @module */

/**
 * <hr style="border:2px solid gray"> </hr>
 * <h3> Seq.from(source) ⇒ Seq </h3>
 * Create a new sequence wrapped a given source. The given source can be anything that implemented iterable protocol.
 * @param source Anything that implemented iterable protocol.
 * @exception {TypeError} if source doesn't conform iterable protocol.
 * @returns {Seq} The return sequence.
 */
export default function from(source) {
  return new Seq(source);
}
