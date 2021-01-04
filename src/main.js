import Seq from './seq';
import of from './of';
import from from './from';
import empty from './empty';
import range from './range';
import repeat from './repeat';
import init from './init';
import initInfinite from './initInfinite';
import length from './length';
import isEmpty from './isEmpty';
import forEach from './forEach';
import toArray from './toArray';
import map from './map';
import reduce from './reduce';
import filter from './filter';
import take from './take';
import concat from './concat';
import some from './some';
import every from './every';
import takeWhile from './takeWhile';

Seq.of = of;
Seq.from = from;
Seq.empty = empty;
Seq.range = range;
Seq.repeat = repeat;
Seq.init = init;
Seq.initInfinite = initInfinite;

Seq.prototype.isEmpty = isEmpty;
Seq.prototype.forEach = forEach;
Seq.prototype.toArray = toArray;
Seq.prototype.map = map;
Seq.prototype.reduce = reduce;
Seq.prototype.filter = filter;
Seq.prototype.take = take;
Seq.prototype.takeWhile = takeWhile;
Seq.prototype.concat = concat;
Seq.prototype.some = some;
Seq.prototype.every = every;

Object.defineProperties(Seq.prototype, {
  length: {
    get: length,
  },
});

export default Seq;
