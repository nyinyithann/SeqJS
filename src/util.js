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

export function checkNonNull(value, name = "value") {
    if (value == null) {
        throw new TypeError(name + " is null or not defined.");
    }
}

export function checkFunction(value, name = "value") {
    if (!this.isFunction(value)) {
        throw new TypeError(name + ' is not a function.');
    }
}

export function checkNonNegative(value, name = "value") {
    if (!Number.isFinite(value) || value < 0 ) {
        throw new TypeError(name + " must be a non-negative number.");
    }
}