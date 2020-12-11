import * as utils from '../src/utils';

export default class Seq {

    constructor (source = function * () {
    }) {
        if (utils.isGeneratorFunction(source)) {
            this._generator = source;
        } else if (utils.isIterable(source)) {
            this._generator = utils.createGeneratorFunction(source);
        } else {
            throw new TypeError('source must be iterable.');
        }
    }

    [Symbol.iterator] () {
        return new Seq(this._generator());
    }

    next () {
        const iter = this._generator();
        const next = iter.next();
        if (!next.done) {
            return { value: next.value };
        }
        return { done: true };
    }

    return () {
        return { done: true };
    }

    get [Symbol.toStringTag] () {
        return 'Seq';
    }

    static get [Symbol.species] () {
        return Seq;
    }

    static from (source) {
        return new Seq(source);
    }

    static of (...args) {
        return new Seq(args);
    }

    static isSeq (source) {
        return Object.prototype.toString.call(source) === '[object Seq]';
    }

    map (callable) {

        if (this == null) {
            throw new TypeError('This is null or not defined.');
        }

        if (!utils.isFunction(callable)) {
            throw new TypeError(callable + ' is not a function.');
        }

        let index = 0;
        let thisArg;

        if (arguments.length > 1) {
            thisArg = arguments[1];
        }

        const iter = this._generator();
        return new Seq(function * () {
            for (const item of iter) {
                yield callable.call(thisArg, item, index++, this);
            }
        });
    }

    filter (predicate) {

        if (this == null) {
            throw new TypeError('This is null or not defined.');
        }

        if (!utils.isFunction(predicate)) {
            throw new TypeError(predicate + ' is not a function.');
        }

        let thisArg;

        if (arguments.length > 1) {
            thisArg = arguments[1];
        }

        const iter = this._generator();
        return new Seq(function * () {
            for (const item of iter) {
                if (predicate.call(thisArg, item, this)) {
                    yield item;
                }
            }
        });
    }

}

const seq = Seq.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
const squareOfEvenNums = seq.filter(x => x % 2 == 0).map(x => x * x);
console.log([...squareOfEvenNums]);
