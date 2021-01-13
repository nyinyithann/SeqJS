import Seq from './seq.core';

/** @module */
/**
 * <h3> Seq.empty() ⇒ Seq </h3>
 * Creates an empty sequence.
 * @returns {Seq} An empty sequence.
 * @example
 * const emptySeq = Seq.empty();
 * console.log(emptySeq.toArray());
 * // => []
 */
export default function empty() {
  return new Seq();
}
