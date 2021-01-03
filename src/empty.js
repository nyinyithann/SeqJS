import Seq from './seq';

/** @module */
/**
 * Seq.empty() ⇒ Seq </br>
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
