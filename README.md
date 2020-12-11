# SeqJS

`SeqJS` contains operations for working with values of type `Seq` which is a container of sequence of elements.
`Seq` conforms [`iterable`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) and [`iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol) protocols of JavaScript.

### Usage

```javascript
const seq = Seq.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
const squareOfEvenNums = seq.filter(x => x % 2 == 0).map(x => x * x);
console.log([...squareOfEvenNums]);
```

### Roadmap
The project is still in progress. 
- To implement almost all the operators of  [F# Seq module](https://fsharp.github.io/fsharp-core-docs/reference/fsharp-collections-seqmodule.html)
- To implement additional useful operators like ones found in loadsh, underscore, itertools
- To implement `AsyncSeq` type and operators
