# SeqJS

`SeqJS` contains operations for working with values of type `Seq` which is a container of sequence of elements.
`Seq` conforms [`iterable`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) and [`iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol) protocols of JavaScript.

## Roadmap
The project is under active development. Below is the roadmap.
- To implement almost all the operators of  [F# Seq module](https://fsharp.github.io/fsharp-core-docs/reference/fsharp-collections-seqmodule.html)
- To implement additional useful operators like ones found in loadsh, underscore, itertools
- To implement `AsyncSeq` type and operators


## API
### Seq Type
Seq instance can be constructed as follows:
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
    [Symbol.iterator] () {
        return this;
    },
    next () {
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

Seq is multi-iterable.
```javascript
let seq = new Seq([1, 2, 3]);
for (const item of seq) {}
for (const item of seq) {}
console.log([...seq]);        
console.log([...seq]);  
// => [1, 2, 3]
// => [1, 2, 3]
```

Seq is closable.
```javascript
let seq = new Seq([1, 2, 3, 4, 5]);
for (const item of seq) {
    if (item == 2) break;
}
console.log([...seq]);
// => [1, 2, 3, 4, 5]
```
## Functions

<dl>
<dt><a href="#map">map(callable)</a> ⇒ <code>Seq</code></dt>
<dd><p>The map() method creates a new Seq populated with the results of calling a provided function on every element.
The provided function is invoked with two arguments: (item, index).</p>
</dd>
<dt><a href="#filter">filter(predicate)</a> ⇒ <code>Seq</code></dt>
<dd><p>Returns a new sequence containing only the elements of the collection for which the given predicate returns &quot;true&quot;.</p>
</dd>
<dt><a href="#reduce">reduce(reducer)</a> ⇒ <code>T</code> | <code>TReturn</code> | <code>*</code></dt>
<dd><p>The method executes the provided reducer function on each element of the sequence, resulting in single output value.
If the seq only has one element and no initialValue is provided, or if initialValue is provided but the seq is empty, the solo value will be returned without calling reducer.</p>
</dd>
</dl>

<a name="map"></a>

## map(callable) ⇒ <code>Seq</code>
The map() method creates a new Seq populated with the results of calling a provided function on every element.
The provided function is invoked with two arguments: (item, index).

**Kind**: global function  
**Returns**: <code>Seq</code> - Return the new mapped sequence.  
**Throws**:

- <code>TypeError</code> If callable is not a function.


| Param | Type | Description |
| --- | --- | --- |
| callable | <code>function</code> | The function invoked on each item. |

**Example**
```js
Seq.of(1,2,3,4,5).map(x => x * x)
// => [1, 4, 9, 16, 25]
```
<a name="filter"></a>

## filter(predicate) ⇒ <code>Seq</code>
Returns a new sequence containing only the elements of the collection for which the given predicate returns "true".

**Kind**: global function  
**Returns**: <code>Seq</code> - The result sequence.  
**Throws**:

- <code>TypeError</code> If predicate is not a function.


| Param | Type | Description |
| --- | --- | --- |
| predicate | <code>function</code> | A function to test whether each item in the input sequence should be included in the output. |

**Example**
```js
Seq.of(1,2,3,4,5).filter(x => x % 2 === 0)
// => [2, 4]
```
<a name="reduce"></a>

## reduce(reducer) ⇒ <code>T</code> \| <code>TReturn</code> \| <code>\*</code>
The method executes the provided reducer function on each element of the sequence, resulting in single output value.
If the seq only has one element and no initialValue is provided, or if initialValue is provided but the seq is empty, the solo value will be returned without calling reducer.

**Kind**: global function  
**Returns**: <code>T</code> \| <code>TReturn</code> \| <code>\*</code> - The single value that results from reduction.  
**Throws**:

- <code>TypeError</code> If reducer is not a function.


| Param | Type | Description |
| --- | --- | --- |
| reducer | <code>function</code> | It takes two arguments - (accumulator, currentValue) |

**Example**
```js
Seq.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).reduce((accumulator, currentValue) => accumulator + currentValue);
// => 55

Seq.of([0, 1], [2, 3], [4, 5]).reduce((accumulator, currentValue) => accumulator.concat(currentValue) , []);
// => [0, 1, 2, 3, 4, 5]
```




### Author
Nyi Nyi Than - [@nyinyithann](https://www.linkedin.com/in/nyinyithan/)

### Credit
- [Exploring ES6](https://exploringjs.com/es6.html) By [Dr. Axel Rauschmayer](https://2ality.com/p/about.html)
- [Understanding ECMAScript 6](https://leanpub.com/understandinges6) By [Nicholas C. Zakas](https://humanwhocodes.com/)
- [javascript.info](https://javascript.info/)
- [Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)

### License
MIT