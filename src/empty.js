import Seq from './seq.core';

/** @module */
/**
 * <h3> SeqCore.empty() ⇒ SeqCore </h3>
 * Creates an empty sequence.
 * @returns {Seq} An empty sequence.
 * @example
 * const emptySeq = SeqCore.empty();
 * console.log(emptySeq.toArray());
 * // => []
 */
export default function empty() {
  return new Seq();
}
