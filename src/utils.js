export function isGeneratorFunction (source) {
    return notNull(source) && source[Symbol.toStringTag] ===
        'GeneratorFunction';
}

export function isIterable (source) {
    return notNull(source) && notUndefined(source[Symbol.iterator]);
}

export function createGeneratorFunction (source) {
    if (isIterable(source)) {
        return function * () {
            for (const item of source) {
                yield item;
            }
        };
    }
    return function * () {
    };
}

export function notNull (value) {
    return value !== null;
}

export function notUndefined (value) {
    return typeof value !== 'undefined';
}

export function isFunction (value) {
    return typeof value === 'function';
}