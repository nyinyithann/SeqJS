export function isNotNull(value) {
  return value !== null;
}

export function isNotUndefined(value) {
  return typeof value !== 'undefined';
}

export function isGeneratorFunction(source) {
  return isNotNull(source) && source[Symbol.toStringTag] === 'GeneratorFunction';
}

export function isIterable(source) {
  return isNotNull(source) && isNotUndefined(source[Symbol.iterator]);
}

export function isArrayLike(source) {
  return isNotNull(source) && typeof source.length === 'number' && typeof source !== 'function';
}

export function createGeneratorFunction(source) {
  if (isIterable(source)) {
    return function* () {
      yield* source;
    };
  }
  if (isArrayLike(source)) {
    return function* () {
      for (let i = 0; i < source.length; i += 1) {
        yield source[i];
      }
    };
  }
  return function* () {};
}

export function isFunction(value) {
  return typeof value === 'function';
}

export function throwIfNull(value, name = 'value') {
  if (value == null) {
    throw new TypeError(`${name} is null or not defined.`);
  }
}

export function throwIfNotAFunction(value, name = 'value') {
  if (!isFunction(value)) {
    throw new TypeError(`${name} is not a function.`);
  }
}

export function throwIfNegativeNumber(value, name = 'value') {
  if (!Number.isFinite(value) || value < 0) {
    throw new TypeError(`${name} must be a non-negative number.`);
  }
}

export function throwIfGeneratorFunction(value, name = 'value') {
  if (isGeneratorFunction(value)) {
    throw TypeError(`${name} is a generator function. It should be a normal function.`);
  }
}

export function throwIfNotAFiniteNumber(value, name = 'value') {
  if (!Number.isFinite(value)) {
    throw new TypeError(`${name} is not a finite number.`);
  }
}

export function throwIfNotSeqType(value, name = 'value') {
  if (Object.prototype.toString.call(value) !== '[object Seq]') {
    throw new TypeError(`${name} is not of type Seq.`);
  }
}

export function checkSameValueZeroEqual(lhs, rhs) {
  return lhs === rhs || (Number.isNaN(lhs) && Number.isNaN(rhs));
}
