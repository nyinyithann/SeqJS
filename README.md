## <img src="assets/seq_logo.png" alt="seq logo" width="56" height="66">&nbsp;&nbsp;SeqJS: Pipeline Operations for working with values of type `SeqCore` 

`SeqJS` contains operations for working with values of type `SeqCore` which is a container of a series of elements. Types of
a seq's elements are not fixed. Individual seq elements are computed only as required.
`SeqCore`
conforms [`iterable`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol)
and [`iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)
protocols of JavaScript.

#### GitHub CI Status
![Node.js CI](https://github.com/nyinyithann/SeqJS/workflows/Node.js%20CI/badge.svg?branch=master&event=push)

## Roadmap

The project is under active development. Below is the roadmap.

- To implement almost all the operators
  of  [F# SeqCore module](https://fsharp.github.io/fsharp-core-docs/reference/fsharp-collections-seqmodule.html)


## Usage

A seq instance can be constructed as follows:

```javascript
// An empty sequence
let seq = new Seq();
console.log([...seq]);
// => [];

// A sequence wrapped an array
let seq = new Seq([1, 2, 3]);
console.log([...seq]);
// => [1, 2, 3]

// A sequence wrapped a generator function
let seq = new Seq(function* () {
    yield 1;
    yield 2;
    yield 3;
});
console.log([...seq]);
// => [1, 2, 3]

// A sequence wrapped an iterator
const iterator = {
    i: 1,
    [Symbol.iterator]() {
        return this;
    },
    next() {
        if (this.i <= 3) {
            return { value: this.i++, done: false };
        }
        return { done: true };
    },
};
let seq = new Seq(iterator);
console.log([...seq]);
// => [1, 2, 3]
```

SeqCore is multi-iterable.

```javascript
let seq = new Seq([1, 2, 3]);
for (const item of seq) {
}
for (const item of seq) {
}
console.log([...seq]);
console.log([...seq]);
// => [1, 2, 3]
// => [1, 2, 3]
```

SeqCore is closable.

```javascript
let seq = new Seq([1, 2, 3, 4, 5]);
for (const item of seq) {
    if (item == 2) break;
}
console.log([...seq]);
// => [1, 2, 3, 4, 5]
```

## API Document
Please read the [API Docs](api.md) for full details.

### Author

Nyi Nyi Than - [@nyinyithann](https://www.linkedin.com/in/nyinyithan/)

### Credit

- [Exploring ES6](https://exploringjs.com/es6.html) By [Dr. Axel Rauschmayer](https://2ality.com/p/about.html)
- [Understanding ECMAScript 6](https://leanpub.com/understandinges6) By [Nicholas C. Zakas](https://humanwhocodes.com/)
- [Collection Pipeline](https://martinfowler.com/articles/collection-pipeline/)
  by [Martin Fowler](https://martinfowler.com/)
- [javascript.info](https://javascript.info/)
- [Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
- [F# SeqCore Module](https://fsharp.github.io/fsharp-core-docs/reference/fsharp-collections-seqmodule.html)

### License

MIT
