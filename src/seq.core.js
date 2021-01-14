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

    this._sourceIterator = this._generator()[Symbol.iterator]();
  }

  [Symbol.iterator]() {
    return new Seq(this._generator());
  }

  next() {
    // const iter = this._generator();
    const next = this._sourceIterator.next();
    if (!next.done) {
      return { value: next.value };
    }
    return { done: true };
  }

  return(value) {
    // let sourceIter;
    // if (util.isGeneratorFunction(this._source)) {
    //   sourceIter = this._source()[Symbol.iterator]();
    // } else {
    //   sourceIter = this._source[Symbol.iterator]();
    // }
    // if (util.isFunction(sourceIter.return)) {
    //   sourceIter.return(value);
    // }

    if (util.isFunction(this._sourceIterator.return)) {
      this._sourceIterator.return(value);
    }
    return { done: true };
  }

  // eslint-disable-next-line class-methods-use-this
  get [Symbol.toStringTag]() {
    return 'Seq';
  }

  static get [Symbol.species]() {
    return Seq;
  }

  static isSeq(source) {
    return Object.prototype.toString.call(source) === '[object Seq]';
  }
}

export default Seq;
