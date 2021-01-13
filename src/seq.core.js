import * as util from './util';

class Seq {
  constructor(source = function* () {}) {
    this._source = source;
    if (util.isGeneratorFunction(this._source)) {
      this._generator = this._source;
    } else if (util.isIterable(this._source) || util.isArrayLike(this._source)) {
      this._generator = util.createGeneratorFunction(this._source);
    } else {
      throw new TypeError('source must be iterable.');
    }
  }

  [Symbol.iterator]() {
    return new Seq(this._generator());
  }

  next() {
    const iter = this._generator();
    const next = iter.next();
    if (!next.done) {
      return { value: next.value };
    }
    return { done: true };
  }

  return(value) {
    let sourceIter;
    if (util.isGeneratorFunction(this._source)) {
      sourceIter = this._source()[Symbol.iterator]();
    } else {
      sourceIter = this._source[Symbol.iterator]();
    }
    sourceIter.return(value);
    return { done: true };
  }

  // eslint-disable-next-line class-methods-use-this
  get [Symbol.toStringTag]() {
    return 'SeqCore';
  }

  static get [Symbol.species]() {
    return Seq;
  }

  static isSeq(source) {
    return Object.prototype.toString.call(source) === '[object SeqCore]';
  }
}

export default Seq;
