import * as util from '../util';

const emptyIterator = {
    [Symbol.iterator]() {
        return this;
    },

    next() {
        return { done: true };
    },

    return(value) {
        return { value, done: true };
    }
};

function take(count, source) {
    util.throwIfNull(source, 'source');
    util.throwIfNegativeNumber(count, 'count');

    if (count === 0) {
        return emptyIterator;
    }

    const iter = source[Symbol.iterator]();
    let innerCount = count;

    const mkIter = () => ({
        next() {
            if (innerCount > 0){
                innerCount -= 1;
                return { value: iter.next().value, done: false};
            }
            return this.return(undefined);
        },
        return(value) {
            innerCount = count;
            return { value, done : true};
        }
    });

    const mkSeq = () => ({
        [Symbol.iterator]() {
            return mkIter();
        }
    });


    return mkSeq();
}

export default take;
