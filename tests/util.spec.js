import * as utils from '../src/util';

describe('Test utility functions', () => {

    const genFunc = function * () {
    };

    test('isIterable()', () => {
        expect(utils.isIterable(genFunc())).toBe(true);
    });

    test('isGeneratorFunction()', () => {
        expect(utils.isGeneratorFunction(genFunc)).toBe(true);
    });

    test('createGeneratorFunction()', () => {
        expect([...utils.createGeneratorFunction([1, 2, 3])()]).
            toEqual([1, 2, 3]);
    });

    test('createGeneratorFunction()', () => {
        const iter = {
            [Symbol.iterator] () { return this; },
            next: () => {
                return { done: true };
            },
        };
        expect([...utils.createGeneratorFunction(iter)()]).
            toEqual([]);
    });

    test(
        'createGeneratorFunction(): Empty generator if source is not iterable.',
        () => {
            expect([...utils.createGeneratorFunction({})()]).
                toEqual([]);
        });

    test('notNull()', () => {
        expect(utils.notNull({})).toBe(true);
    });

    test('notUndefined()', () => {
        expect(utils.notUndefined(void 0)).toBe(false);
    });

    test('isFunction()', () => {
        expect(utils.isFunction(function () {})).toBe(true);
    });

});