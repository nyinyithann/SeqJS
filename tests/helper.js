global.array_ForTest = [1, 2, 3, 4, 5];

global.iterator_ForTest = {
    i: 1,
    [Symbol.iterator] () {
        return this;
    },
    next () {
        if (this.i <= 5) {
            return { value: this.i++, done: false };
        }
        return { done: true };
    },
};

global.generatorFunction_ForTest = function * () {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
};

global.getRandomNumber_ForTest = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
};

global.getNumberGeneratorStartingFrom = start =>  {
    return function () {
        return start++;
    }
};

global.arrayLikeObject_ForTest = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    '3': 'd',
    '4': 'e',
    length: 5,
};