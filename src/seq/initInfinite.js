import * as util from '../util';

function initInfinite(initializer) {
    util.throwIfNotAFunction(initializer, 'initializer');
    util.throwIfGeneratorFunction(initializer, 'initializer');

    let index = -1;
    const mkIter = () => ({
        next() {
            if (index === -1) {
                index = 0;
            }
            else {
                index += 1;
            }
            if (index < Number.MAX_SAFE_INTEGER) {
                return { value: initializer(index), done: false };
            }
            return this.reset(undefined);
        },
        return(value) {
            return this.reset(value);
        },
        reset(value) {
            index = -1;
            return { value, done: true };
        },
    });

    const mkSeq = () => ({
        [Symbol.iterator]() {
            return mkIter();
        }
    });


    return mkSeq();
}

export default initInfinite;
