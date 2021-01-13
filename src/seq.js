import * as util from './util';
import Seq from './seq.core';
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
import iter from './iter';
import toArray from './toArray';
import map from './map';
import reduce from './reduce';
import filter from './filter';
import take from './take';
import takeWhile from './takeWhile';
import append from './append';
import prepend from './prepend';
import exists from './exists';
import forall from './forall';
import reverse from './reverse';
import head from './head';
import tail from './tail';
import countBy from './countBy';
import last from './last';
import findBack from './findBack';
import item from './item';

Seq.of = of;
Seq.from = from;
Seq.empty = empty;
Seq.range = range;
Seq.replicate = replicate;
Seq.init = init;
Seq.initInfinite = initInfinite;

Seq.prototype.toString = toString;
Seq.prototype.isEmpty = isEmpty;
Seq.prototype.iter = iter;
Seq.prototype.toArray = toArray;
Seq.prototype.map = map;
Seq.prototype.reduce = reduce;
Seq.prototype.filter = filter;
Seq.prototype.take = take;
Seq.prototype.takeWhile = takeWhile;
Seq.prototype.append = append;
Seq.prototype.prepend = prepend;
Seq.prototype.exists = exists;
Seq.prototype.forall = forall;
Seq.prototype.reverse = reverse;
Seq.prototype.head = head;
Seq.prototype.tail = tail;
Seq.prototype.countBy = countBy;
Seq.prototype.last = last;
Seq.prototype.findBack = findBack;
Seq.prototype.item = item;

Object.defineProperty(Seq.prototype, 'length', {
  get: length,
  configurable: false,
  enumerable: true,
});

Seq.map = (mapper) => (seq) => {
  util.throwIfNotSeqType(seq, 'seq');
  return seq.map(mapper);
};

Seq.filter = (predicate) => (seq) => {
  util.throwIfNotSeqType(seq, 'seq');
  return seq.filter(predicate);
};

export default Seq;
