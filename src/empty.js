import Seq from './seq';

/** @module */
/**
 * <hr style="border:2px solid gray"> </hr>
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
