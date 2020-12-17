# SeqJS

`SeqJS` contains operations for working with values of type `Seq` which is a container of a series of elements. Types of a seq's elements are not fixed. Individual seq elements are computed only as required.
`Seq` conforms [`iterable`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) and [`iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol) protocols of JavaScript.

## Roadmap
The project is under active development. Below is the roadmap.
- To implement almost all the operators of  [F# Seq module](https://fsharp.github.io/fsharp-core-docs/reference/fsharp-collections-seqmodule.html)
- To implement additional useful operators like ones found in loadsh, underscore, itertools
- To implement `AsyncSeq` type and operators


## API
### Seq Type
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

## Members

<dl>
<dt><a href="#length">length</a> ⇒ <code>number</code></dt>
<dd><p>Returns the length of the sequence.</p>
</dd>
</dl>

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
<dd><p>The method executes the provided reducer function on each element of the sequence, resulting in single output value.</p>
</dd>
<dt><a href="#concat">concat(other)</a> ⇒ <code>Seq</code></dt>
<dd><p>The concat() method creates a new seq that appends the passed value to the existing seq. This method does not change the existing sequence.</p>
</dd>
<dt><a href="#some">some(predicate)</a> ⇒ <code>boolean</code></dt>
<dd><p>The some() method tests if at least one element in the seq passes the test implemented by the provided function.</p>
</dd>
<dt><a href="#every">every(predicate)</a> ⇒ <code>boolean</code></dt>
<dd><p>The every() method tests if all elements of the sequence satisfy the given predicate.</p>
</dd>
</dl>

<a name="length"></a>

## length ⇒ <code>number</code>
Returns the length of the sequence.

**Kind**: global variable  
**Returns**: <code>number</code> - The length of the sequence.  
**Example**
```js
const seq = Seq.of(1,2,3);
console.log(seq.length);
// => 3;
```
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
const seq = Seq.of(1,2,3,4,5).map(x => x * x);
console.log([...seq]);
// => [1, 4, 9, 16, 25]

const seq = Seq.of(1,2,3,4,5).map((item, index) => [index, item]);
console.log([...seq]);
// => [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]]
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
const seq = Seq.of(1,2,3,4,5).filter(x => x % 2 === 0);
console.log([...seq]);
// => [2, 4]
```
<a name="reduce"></a>

## reduce(reducer) ⇒ <code>T</code> \| <code>TReturn</code> \| <code>\*</code>
The method executes the provided reducer function on each element of the sequence, resulting in single output value.

**Kind**: global function  
**Returns**: <code>T</code> \| <code>TReturn</code> \| <code>\*</code> - The single value that results from reduction.  
**Throws**:

- <code>TypeError</code> If reducer is not a function.


| Param | Type | Description |
| --- | --- | --- |
| reducer | <code>function</code> | It takes two arguments - (accumulator, currentValue). if initialValue is provided, the value will be used as the first argument in the reducer. Otherwise; the first element of the sequence will be used as the first argument. |

**Example**
```js
const result = Seq.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).reduce((accumulator, currentValue) => accumulator + currentValue);
console.log(result);
// => 55

const result = Seq.of([0, 1], [2, 3], [4, 5]).reduce((accumulator, currentValue) => accumulator.concat(currentValue) , []);
console.log(result);
// => [0, 1, 2, 3, 4, 5]
```
<a name="concat"></a>

## concat(other) ⇒ <code>Seq</code>
The concat() method creates a new seq that appends the passed value to the existing seq. This method does not change the existing sequence.

**Kind**: global function  
**Returns**: <code>Seq</code> - The result sequence.

| Param | Description |
| --- | --- |
| other | Iterable, iterator, generator function or single value to concatenate into new sequence. |

**Example**
```js
const seq = Seq.of(1,2,3);
const carr = seq.concat([4,5,6]);
console.log([...carr]);
// => [1, 2, 3, 4, 5, 6]
```
<a name="some"></a>

## some(predicate) ⇒ <code>boolean</code>
The some() method tests if at least one element in the seq passes the test implemented by the provided function.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| predicate | <code>function</code> | A function to test on the elements of the seq. It takes two argument - (element, thisArg) |

**Example**
```js
const seq = Seq.of(1,2,3,4,5);
const result = seq.some(x => x % 2 == 0);
console.log(result);
// => true
```
<a name="every"></a>

## every(predicate) ⇒ <code>boolean</code>
The every() method tests if all elements of the sequence satisfy the given predicate.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| predicate | <code>function</code> | A function to test on the elements of the seq. It takes two argument - (element, thisArg) |

**Example**
```js
const seq = Seq.of(2, 4, 5, 8);
const result = seq.some(x => x % 2 == 0);
console.log(result);
// => true
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