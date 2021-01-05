import * as util from './util';

class Seq {
  /* eslint class-methods-use-this : 0 */
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

  return() {
    return { done: true };
  }

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
