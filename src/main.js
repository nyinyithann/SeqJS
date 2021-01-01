import Seq from './seq';
import of from './seq.of';
import from from './seq.from';
import empty from './seq.empty';
import take from './seq.take';
import map from './seq.map';

Seq.empty = empty;
Seq.from = from;
Seq.of = of;
Seq.prototype.take = take;
Seq.prototype.map = map;

export default Seq;
