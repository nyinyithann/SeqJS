import Seq from './seq';

export default function of(...args) {
  return new Seq(args);
}
