import Seq from './seq';
import of from './of';
import from from './from';
import empty from './empty';
import range from './range';
import replicate from './replicate';
import init from './init';
import initInfinite from './initInfinite';
import toString from './toString';
import length from './length';
import isEmpty from './isEmpty';
import forEach from './forEach';
import toArray from './toArray';
import map from './map';
import reduce from './reduce';
import filter from './filter';
import take from './take';
import takeWhile from './takeWhile';
import concat from './concat';
import prepend from './prepend';
import exists from './exists';
import forall from './forall';
import reverse from './reverse';
import head from './head';
import tail from './tail';
import countBy from './countBy';
import last from './last';
import findBack from './findBack';

Seq.of = of;
Seq.from = from;
Seq.empty = empty;
Seq.range = range;
Seq.repeat = replicate;
Seq.init = init;
Seq.initInfinite = initInfinite;

Seq.prototype.toString = toString;
Seq.prototype.isEmpty = isEmpty;
Seq.prototype.forEach = forEach;
Seq.prototype.toArray = toArray;
Seq.prototype.map = map;
Seq.prototype.reduce = reduce;
Seq.prototype.filter = filter;
Seq.prototype.take = take;
Seq.prototype.takeWhile = takeWhile;
Seq.prototype.concat = concat;
Seq.prototype.prepend = prepend;
Seq.prototype.some = exists;
Seq.prototype.every = forall;
Seq.prototype.reverse = reverse;
Seq.prototype.head = head;
Seq.prototype.tail = tail;
Seq.prototype.countBy = countBy;
Seq.prototype.last = last;
Seq.prototype.lastBy = findBack;

Object.defineProperty(Seq.prototype, 'length', {
  get: length,
  configurable: false,
  enumerable: true,
});

export default Seq;
