import * as util from './util';

export default class Seq {

    constructor (source = function * () {
    }) {
        this._source = source;
        if (util.isGeneratorFunction(this._source)) {
            this._generator = this._source;
        } else if (util.isIterable(this._source) || util.isArrayLike(source)) {
            this._generator = util.createGeneratorFunction(this._source);
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

    /**
     * Generate a new sequence by invoking initializer function passed as the argument up to the given count.
     * @param {Number} count The maximum number of items to generate for the sequence.
     * @param {Function } initializer A function that generates an item in the sequence from a given index.
     * @returns {Seq} The result sequence.
     * @example
     * const fiveNums = Seq.initInfinite(5, x => x * 2);
     * console.log(fiveNums.toArray());
     * => [0, 2, 4, 6, 8]
     */
    static init (count, initializer) {
        util.checkNonNegative(count, 'count');
        util.checkNonFunction(initializer, 'initializer');
        util.checkGeneratorFunction(initializer, 'initializer');

        if (count === 0) {
            return Seq.empty();
        }

        return new Seq(function * () {
            for (let i = 0; i < count; i++) {
                yield initializer(i);
            }
        });
    }

    /**
     * Generate a new sequence by invoking initializer function passed as the argument.
     * The index of the item generated is passed to the initializer function.
     * The iteration can continue up to Number.MAX_SAFE_INTEGER.
     * @param {Function } initializer A function that generates an item in the sequence from a given index.
     * @returns {Seq} The result sequence.
     * @example
     * const seq = Seq.initInfinite(x => x * 2);
     * const first5Nums = seq.take(5);
     * console.log(first5Nums.toArray());
     * => [0, 2, 4, 6, 8]
     */
    static initInfinite (initializer) {
        util.checkNonFunction(initializer, 'initializer');
        util.checkGeneratorFunction(initializer, 'initializer');

        let index = 0;

        return new Seq(function * () {
            while (index < Number.MAX_SAFE_INTEGER) {
                yield initializer(index++);
            }
        });
    }

    /**
     * Creates a sequence by replicating the given initial value.
     * @param {Number} count The number of elements to replicate.
     * @param initial The value to replicate.
     * @returns {Seq} The generated sequence.
     * @example
     * const seq = Seq.repeat(5, 1);
     * console.log(seq.toArray());
     * => [1, 1, 1, 1, 1]
     */
    static repeat (count, initial) {
        util.checkNonNegative(count, 'count');

        if (count === 0) {
            return Seq.empty();
        }

        return new Seq(function * () {
            for (let i = 0; i < count; i++) {
                yield initial;
            }
        });
    }

    static empty () {
        return new Seq();
    }

    static isSeq (source) {
        return Object.prototype.toString.call(source) === '[object Seq]';
    }

    /**
     * Returns the length of the sequence.
     * @returns {number} The length of the sequence.
     * @example
     * const seq = Seq.of(1,2,3);
     * console.log(seq.length);
     * // => 3;
     */
    get length () {
        if (Array.isArray(this._source)) {
            return this._source.length;
        } else {
            let count = 0;
            const iter = this._generator();
            while (!iter.next().done) {
                count++;
            }
            return count;
        }
    }

    /**
     * Returns true if the sequence contains no elements, false otherwise.
     * @returns {boolean} True if the sequence is empty; false otherwise.
     * @example
     * console.log(Seq.empty().isEmpty());
     * // => true
     */
    isEmpty () {
        util.checkNonNull(this, 'this');
        return this._generator().next().done;
    }

    /**
     * Create an array out of the sequence.
     * @returns {Array} The result array.
     * @example
     *
     * const seq = Seq.of(1,2,3,4);
     * const arr = seq.toArray();
     * console.log(arr);
     * // => [1,2,3,4]
     */
    toArray () {
        util.checkNonNull(this, 'this');
        return [...this._generator()];
    }

    /**
     * Applies the given function to each element of the collection.
     * @param  {Function} callback A function to apply to each element of the sequence.
     * @example
     *
     * const seq = Seq.of(g1, 2, 3, 4, 5);
     * seq.forEach(x => console.log(x));
     * // => 1
     *       2
     *       3
     *       4
     *       5
     */
    forEach (callback) {
        util.checkNonNull(this, 'this');
        util.checkNonFunction(callback, 'callback');
        util.checkGeneratorFunction(callback, 'callback');

        let index = 0;
        let thisArg;

        if (arguments.length > 1) {
            thisArg = arguments[1];
        }

        const iter = this._generator();
        for (const item of iter) {
            callback.call(thisArg, item, index++);
        }
    }

    /**
     * The map() method creates a new Seq populated with the results of calling a provided function on every element.
     * The provided function is invoked with two arguments: (item, index).
     *
     * @param {Function} callback The function invoked on each item.
     * @returns {Seq} Return the new mapped sequence.
     * @exception {TypeError} If callable is not a function.
     * @example
     *
     * const seq = Seq.of(1,2,3,4,5).map(x => x * x);
     * console.log([...seq]);
     * // => [1, 4, 9, 16, 25]
     *
     * const seq = Seq.of(1,2,3,4,5).map((item, index) => [index, item]);
     * console.log([...seq]);
     * // => [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]]
     */
    map (callback) {

        util.checkNonNull(this, 'this');
        util.checkNonFunction(callback, 'callback');
        util.checkGeneratorFunction(callback, 'callback');


        let index = 0;
        let thisArg;

        if (arguments.length > 1) {
            thisArg = arguments[1];
        }

        const iter = this._generator();
        return new Seq(function * () {
            for (const item of iter) {
                yield callback.call(thisArg, item, index++);
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
     * const seq = Seq.of(1,2,3,4,5).filter(x => x % 2 === 0);
     * console.log([...seq]);
     * // => [2, 4]
     */
    filter (predicate) {

        util.checkNonNull(this, 'this');
        util.checkNonFunction(predicate, 'predicate');
        util.checkGeneratorFunction(predicate, 'predicate');


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
     * @param reducer {Function} It takes two arguments - (accumulator, currentValue). if initialValue is provided, the value will be used as the first argument in the reducer.
     * Otherwise; the first element of the sequence will be used as the first argument.
     * @returns A single value that results from reduction.
     * @exception {TypeError} If reducer is not a function.
     *
     * @example
     * const result = Seq.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).reduce((accumulator, currentValue) => accumulator + currentValue);
     * console.log(result);
     * // => 55
     *
     * const result = Seq.of([0, 1], [2, 3], [4, 5]).reduce((accumulator, currentValue) => accumulator.concat(currentValue) , []);
     * console.log(result);
     * // => [0, 1, 2, 3, 4, 5]
     */
    reduce (reducer) {

        util.checkNonNull(this, 'this');
        util.checkNonFunction(reducer, 'reducer');
        util.checkGeneratorFunction(reducer, 'reducer');

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
        let state;
        if (initialValue) {
            state = reducer(initialValue, current.value);
        } else {
            state = current.value;
        }
        while (!(current = iter.next()).done) {
            state = reducer(state, current.value);
        }
        return state;
    }

    /**
     * The concat() method creates a new seq that appends the passed value to the existing seq. This method does not change the existing sequence.
     * @param other Iterable, iterator, generator function or single value to concatenate into new sequence.
     * @returns {Seq} The result sequence.
     * @example
     * const seq = Seq.of(1,2,3);
     * const carr = seq.concat([4,5,6]);
     * console.log([...carr]);
     * // => [1, 2, 3, 4, 5, 6]
     */
    concat (other) {

        util.checkNonNull(this, 'this');

        let otherIter;
        if (util.isGeneratorFunction(other)) {
            otherIter = other();
        } else if (util.isIterable(other)) {
            otherIter = other[Symbol.iterator]();
        } else {
            otherIter = {
                * [Symbol.iterator] () {
                    yield other;
                },
            };
        }

        const thisIter = this._generator();
        return new Seq(function * () {
            yield * thisIter;
            yield * otherIter;
        });
    }

    /**
     * The some() method tests if at least one element in the seq passes the test implemented by the provided function.
     * @param {Function} predicate A function to test on the elements of the seq. It takes two argument - (element, thisArg)
     * @returns {boolean}
     * @example
     * const seq = Seq.of(1,2,3,4,5);
     * const result = seq.some(x => x % 2 == 0);
     * console.log(result);
     * // => true
     */
    some (predicate) {

        util.checkNonNull(this, 'this');
        util.checkNonFunction(predicate, 'predicate');
        util.checkGeneratorFunction(predicate, 'predicate');

        let thisArg;

        if (arguments.length > 1) {
            thisArg = arguments[1];
        }

        let current;
        const iter = this._generator();
        while (!(current = iter.next()).done) {
            if (predicate.call(thisArg, current.value)) {
                return true;
            }
        }
        return false;
    }

    /**
     * The every() method tests if all elements of the sequence satisfy the given predicate.
     * @param {Function} predicate A function to test on the elements of the seq. It takes two argument - (element, thisArg)
     * @returns {boolean}
     * @example
     * const seq = Seq.of(2, 4, 5, 8);
     * const result = seq.some(x => x % 2 == 0);
     * console.log(result);
     * // => true
     */
    every (predicate) {

        util.checkNonNull(this, 'this');
        util.checkNonFunction(predicate, 'predicate');
        util.checkGeneratorFunction(predicate, 'predicate');

        let thisArg;

        if (arguments.length > 1) {
            thisArg = arguments[1];
        }

        let current;
        const iter = this._generator();
        while (!(current = iter.next()).done) {
            if (!predicate.call(thisArg, current.value)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Returns the first N elements of the sequence.
     * @param count The number of items to take.
     * @returns {Seq} The result sequence.
     * @example
     * const seq = Seq.of(1,2,3,4,5);
     * const taken = seq.take(2);
     * console.log([...taken]);
     * // => [1, 2]
     */
    take (count) {
        util.checkNonNull(this, 'this');
        util.checkNonNegative(count, 'count');

        if (count === 0) {
            return Seq.empty();
        } else {
            let current;
            const iter = this._generator();
            return new Seq(function * () {
                for (let i = 0; i < count; i++) {
                    current = iter.next();
                    if (!current.done) {
                        yield current.value;
                    }
                }
            });
        }
    }

    /**
     * Returns a sequence that, when iterated, yields elements of the underlying sequence while the given predicate returns True, and then returns no further elements.
     * @param {Function} predicate A function that evaluates to false when no more items should be returned.
     * @returns {Seq} The result sequence.
     * @example
     * const seq = Seq.from([1,2,3,4,5]);
     * const result = seq.takeWhile(x => x < 3).toArray();
     * console.log(result);
     * => [1, 2]
     */
    takeWhile (predicate) {
        util.checkNonFunction(predicate, 'predicate');
        util.checkGeneratorFunction(predicate, 'predicate');

        let thisArg;

        if (arguments.length > 1) {
            thisArg = arguments[1];
        }

        let current;
        const iter = this._generator();
        return new Seq(function * () {
            while (!(current = iter.next()).done &&
            predicate.call(thisArg, current.value)) {
                yield current.value;
            }
        });
    }

}

