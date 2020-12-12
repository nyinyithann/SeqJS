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

    /**
     * The map() method creates a new Seq populated with the results of calling a provided function on every element.
     * The provided function is invoked with two arguments: (item, index).
     *
     * @param {Function} callable The function invoked on each item.
     * @returns {Seq} Return the new mapped sequence.
     * @exception {TypeError} If callable is not a function.
     * @example
     *
     * Seq.of(1,2,3,4,5).map(x => x * x)
     * // => [1, 4, 9, 16, 25]
     */
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
                yield callable.call(thisArg, item, index++);
            }
        });
    }

    /**
     * Returns a new sequence containing only the elements of the collection for which the given predicate returns "true".
     * @param {Function} predicate A function to test whether each item in the input sequence should be included in the output.
     * @returns {Seq} The result sequence.
     * @exception {TypeError} If predicate is not a function.
     * @example
     *
     * Seq.of(1,2,3,4,5).filter(x => x % 2 === 0)
     * // => [2, 4]
     */
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
                if (predicate.call(thisArg, item)) {
                    yield item;
                }
            }
        });
    }

    /**
     * The method executes the provided reducer function on each element of the sequence, resulting in single output value.
     * If the seq only has one element and no initialValue is provided, or if initialValue is provided but the seq is empty, the solo value will be returned without calling reducer.
     * @param reducer {Function} It takes two arguments - (accumulator, currentValue)
     * @returns {T|TReturn|*} The single value that results from reduction.
     * @exception {TypeError} If reducer is not a function.
     *
     * @example
     * Seq.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).reduce((accumulator, currentValue) => accumulator + currentValue);
     * // => 55
     *
     * Seq.of([0, 1], [2, 3], [4, 5]).reduce((accumulator, currentValue) => accumulator.concat(currentValue) , []);
     * // => [0, 1, 2, 3, 4, 5]
     */
    reduce (reducer) {

        if (this == null) {
            throw new TypeError('This is null or not defined.');
        }

        if (!utils.isFunction(reducer)) {
            throw new TypeError(reducer + ' is not a function.');
        }

        let initialValue;

        if (arguments.length > 1) {
            initialValue = arguments[1];
        }

        const iter = this._generator();
        let current = iter.next();
        if (current.done) {
            if (initialValue) {
                return initialValue;
            } else {
                throw new TypeError(
                    'Reduce of empty sequence with no initial value.');
            }
        }
        let state = current.value;
        while (!(current = iter.next()).done) {
            state = reducer(state, current.value);
        }
        return state;

    }
}

