import * as utils from '../src/utils';

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
        expect([...utils.createGeneratorFunction([1, 2, 3])()].join()).
            toBe([1, 2, 3].join());
    });

    test('createGeneratorFunction()', () => {
        const iter = {
            [Symbol.iterator] () { return this; },
            next: () => {
                return { done: true };
            },
        };
        expect([...utils.createGeneratorFunction(iter)()].join()).
            toBe([].join());
    });

    test(
        'createGeneratorFunction(): Empty generator if source is not iterable.',
        () => {
            expect([...utils.createGeneratorFunction({})()].join()).
                toBe([].join());
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