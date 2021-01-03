<!--  ## Modules

<dl>
<dt><a href="#module_concat">concat</a></dt>
<dd></dd>
<dt><a href="#module_empty">empty</a></dt>
<dd></dd>
<dt><a href="#module_every">every</a></dt>
<dd></dd>
<dt><a href="#module_filter">filter</a></dt>
<dd></dd>
<dt><a href="#module_forEach">forEach</a></dt>
<dd></dd>
<dt><a href="#module_from">from</a></dt>
<dd></dd>
<dt><a href="#module_init">init</a></dt>
<dd></dd>
<dt><a href="#module_initInfinite">initInfinite</a></dt>
<dd></dd>
<dt><a href="#module_isEmpty">isEmpty</a></dt>
<dd></dd>
<dt><a href="#module_length">length</a></dt>
<dd></dd>
<dt><a href="#module_map">map</a></dt>
<dd></dd>
<dt><a href="#module_of">of</a></dt>
<dd></dd>
<dt><a href="#module_reduce">reduce</a></dt>
<dd></dd>
<dt><a href="#module_repeat">repeat</a></dt>
<dd></dd>
<dt><a href="#module_some">some</a></dt>
<dd></dd>
<dt><a href="#module_take">take</a></dt>
<dd></dd>
<dt><a href="#module_takeWhile">takeWhile</a></dt>
<dd></dd>
<dt><a href="#module_toArray">toArray</a></dt>
<dd></dd>
</dl>

-->
  <h3>concat([val1[,val2[,...[,valN]]]]) ⇒ Seq </h3>
Creates a new seq that appends the passed value to the existing seq. This method does not change the existing sequence.

**Returns**: <code>Seq</code> - A new sequence.  
**Throws**:

- <code>TypeError</code> if the existing sequence is null or undefined.


| Param | Description |
| --- | --- |
| ...others | Iterable, iterator, generator function or single value to concatenate into new sequence. If omitted, the method returns the existing sequence. |

**Example**  
```js
const seq = Seq.of(1, 2, 3);
const result = seq.concat([4, 5, 6], { seven: 7 }, [[8], [9]], [[[10], [11]]]);
console.log(result.toArray());
// => [ 1, 2, 3, 4, 5, 6, { seven: 7 }, [ 8 ], [ 9 ], [ [ 10 ], [ 11 ] ] ]
```
<hr style="border:2px solid gray"> </hr>
<h3> Seq.empty() ⇒ Seq </h3>
Creates an empty sequence.

**Returns**: <code>Seq</code> - An empty sequence.  
**Example**  
```js
const emptySeq = Seq.empty();
console.log(emptySeq.toArray());
// => []
```
<hr style="border:2px solid gray"> </hr>
<h3>every(predicate) ⇒ Seq</h3>
Tests if all elements of the sequence satisfy the given predicate.

**Returns**: <code>boolean</code> - true if the callback function returns a truthy value for at least one element in the sequence. Otherwise, false.  
**Throws**:

- If the source sequence is null or undefined; or predicate is not a function or a generator function.


| Param | Type | Description |
| --- | --- | --- |
| predicate | <code>function</code> | A function to test on the elements of the seq. |

**Example**  
```js
const seq = Seq.of(2, 4, 5, 8);
const result = seq.some(x => x % 2 === 0);
console.log(result);
// => true
```
<hr style="border:2px solid gray"> </hr>
<h3>filter(predicate) ⇒ Seq</h3>
Returns a new sequence containing only the elements of the collection for which the given predicate returns "true".

**Returns**: <code>Seq</code> - The result sequence.  
**Throws**:

- <code>TypeError</code> If the source sequence is null or undefined; or predicate is not a function or a generator function.


| Param | Type | Description |
| --- | --- | --- |
| predicate | <code>function</code> | A function to test whether each item in the input sequence should be included in the output. |

**Example**  
```js
const seq = Seq.of(1,2,3,4,5).filter(x => x % 2 === 0);
console.log([...seq]);
// => [2, 4]
```
<hr style="border:2px solid gray"> </hr>
<h3> forEach(callback) ⇒ undefined </h3>
Applies the given function to each element of the collection.

**Throws**:

- <code>TypeError</code> If the source sequence is null or undefined; or predicate is not a function or a generator function.


| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | A function to apply to each element of the sequence. |

**Example**  
```js
const seq = Seq.of(1, 2, 3, 4, 5);
seq.forEach(x => console.log(x));
// =>   1
// =>   2
// =>   3
// =>   4
// =>   5
```
<hr style="border:2px solid gray"> </hr>
<h3> Seq.from(source) ⇒ Seq </h3>
Create a new sequence wrapped a given source. The given source can be anything that implemented iterable protocol.

**Returns**: <code>Seq</code> - The return sequence.  
**Throws**:

- <code>TypeError</code> if source doesn't conform iterable protocol.


| Param | Description |
| --- | --- |
| source | Anything that implemented iterable protocol. |

<hr style="border:2px solid gray"> </hr>
<h3> init(count, initializer) ⇒ Seq </h3>
Generate a new sequence by invoking initializer function passed as the argument up to the given count.

**Returns**: <code>Seq</code> - The result sequence.  
**Throws**:

- <code>TypeError</code> if count is a negative number; or initializer is not a function or a generator function.


| Param | Type | Description |
| --- | --- | --- |
| count | <code>Number</code> | The maximum number of items to generate for the sequence. |
| initializer | <code>function</code> | A function that generates an item in the sequence from a given index. |

**Example**  
```js
const fiveNums = Seq.init(5, x => x * 2);
console.log(fiveNums.toArray());
// => [0, 2, 4, 6, 8]
```
<hr style="border:2px solid gray"> </hr>
<h3> initInfinite(initializer) ⇒ Seq </h3>
Generate a new sequence by invoking initializer function passed as the argument.
The index of the item generated is passed to the initializer function.
The iteration can continue up to Number.MAX_SAFE_INTEGER.

**Returns**: <code>Seq</code> - The result sequence.  
**Throws**:

- <code>TypeError</code> if initializer is not a function or a generator function.


| Param | Type | Description |
| --- | --- | --- |
| initializer | <code>function</code> | A function that generates an item in the sequence from a given index. |

**Example**  
```js
const seq = Seq.initInfinite(x => x * 2);
const first5Nums = seq.take(5);
console.log(first5Nums.toArray());
// => [0, 2, 4, 6, 8]
```
<hr style="border:2px solid gray"> </hr>
<h3> isEmpty() ⇒ Boolean </h3>
Returns true if the sequence contains no elements, false otherwise.

**Returns**: <code>boolean</code> - True if the sequence is empty; false otherwise.  
**Throws**:

- <code>TypeError</code> if the source sequence is null or undefined.

**Example**  
```js
console.log(Seq.empty().isEmpty());
// => true
```
<hr style="border:2px solid gray"> </hr>
<h3> length ⇒ Number </h3>
Returns the length of the sequence.

**Returns**: <code>number</code> - The length of the sequence.  
**Throws**:

- <code>TypeError</code> if the source sequence is null or undefined.

**Example**  
```js
const seq = Seq.of(1,2,3);
console.log(seq.length);
// => 3;
```
<hr style="border:2px solid gray"> </hr>
<h3> map(callback) ⇒ Seq </h3>
The map method creates a new Seq populated with the results of calling a provided function on every element.
The provided function is invoked with two arguments: (item, index).

**Returns**: <code>Seq</code> - Return the new mapped sequence.  
**Throws**:

- <code>TypeError</code> If the source sequence is null or undefined; or callback is a not a function or a generator function.


| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | The function invoked on each item. |

**Example**  
```js
const seq = Seq.of(1,2,3,4,5).map(x => x * x);
console.log([...seq]);
// => [1, 4, 9, 16, 25]

const seq = Seq.of(1,2,3,4,5).map((item, index) => [index, item]);
console.log([...seq]);
// => [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]]
```
<hr style="border:2px solid gray"> </hr>
<h3> Seq.of(elem0[elem1[,...[,elemN]]]) ⇒ Seq </h3>
Creates a new sequence from a variable number of arguments, regardless of number or type of the arguments.

**Returns**: <code>Seq</code> - A new sequence.  

| Param | Description |
| --- | --- |
| args | Elements used to create the sequence. |

**Example**  
```js
const nums = Seq.of(1,2, { 'three' : 3}, [4], '5', 0b110);
console.log(nums);
// => [ 1, 2, { three: 3 }, [ 4 ], '5', 6 ]
```
<hr style="border:2px solid gray"> </hr>
<h3> reduce(reducer) ⇒ Any </h3>
The method executes the provided reducer function on each element of the sequence, resulting in single output value.

**Returns**: A single value that results from reduction.  
**Throws**:

- <code>TypeError</code> If the source sequence is null or undefined; or reducer is not a function or a generator function; or when the source sequence is empty and initial value is not provided.


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
<hr style="border:2px solid gray"> </hr>
<h3> repeat(count, initial) ⇒ Seq </h3>
Creates a sequence by replicating the given initial value.

**Returns**: <code>Seq</code> - The generated sequence.  
**Throws**:

- <code>TypeError</code> if count is a negative number.


| Param | Type | Description |
| --- | --- | --- |
| count | <code>Number</code> | The number of elements to replicate. |
| initial |  | The value to replicate. |

**Example**  
```js
const seq = Seq.repeat(5, 1);
console.log(seq.toArray());
// => [1, 1, 1, 1, 1]
```
<hr style="border:2px solid gray"> </hr>
<h3> some(predicate) ⇒ Seq </h3>
Tests if at least one element in the sequence passes the test implemented by the provided function.

**Returns**: <code>boolean</code> - true if the callback function returns a truthy value for at least one element in the sequence. Otherwise, false.  
**Throws**:

- If the source sequence is null or undefined; or predicate is not a function or a generator function.


| Param | Type | Description |
| --- | --- | --- |
| predicate | <code>function</code> | A function to test on the elements of the seq. |

**Example**  
```js
const seq = Seq.of(1,2,3,4,5);
const result = seq.some(x => x % 2 === 0);
console.log(result);
// => true
```
<hr style="border:2px solid gray"> </hr>
<h3> take(count) ⇒ Seq </h3>
Returns the first N elements of the sequence.

**Returns**: <code>Seq</code> - The result sequence.  
**Throws**:

- <code>TypeError</code> if the source sequence is null or undefined; or count is a negative number.


| Param | Description |
| --- | --- |
| count | The number of items to take. |

**Example**  
```js
const seq = Seq.of(1,2,3,4,5);
const taken = seq.take(2);
console.log([...taken]);
// => [1, 2]
```
<hr style="border:2px solid gray"> </hr>
<h3> takeWhile(predicate) ⇒ Seq </h3>
Returns a sequence that, when iterated, yields elements of the underlying sequence while the given predicate returns True, and then returns no further elements.

**Returns**: <code>Seq</code> - The result sequence.  
**Throws**:

- <code>TypeError</code> If the source sequence is null or undefined; or predicate is not a function or a generator function.


| Param | Type | Description |
| --- | --- | --- |
| predicate | <code>function</code> | A function that evaluates to false when no more items should be returned. |

**Example**  
```js
const seq = Seq.from([1, 2, 3, 1, 2, 3]);
const result = seq.takeWhile(x => x < 3).toArray();
console.log(result);
=> [1, 2]
```
<hr style="border:2px solid gray"> </hr>
<h3> toArray() ⇒ Seq </h3>
Create an array out of the sequence.

**Returns**: <code>Array</code> - The result array.  
**Throws**:

- <code>TypeError</code> If the source sequence is null or undefined.

**Example**  
```js
const seq = Seq.of(1,2,3,4);
const arr = seq.toArray();
console.log(arr);
// => [1,2,3,4]
```
