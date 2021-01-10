  <h3>concat([val1[,val2[,...[,valN]]]]) ⇒ Seq</h3>
Creates a new sequence that appends the passed value to the existing seq. This method does not change the existing sequence.

**Returns**: <code>Seq</code> - A new sequence.  
**Throws**:

- <code>TypeError</code> if the existing sequence is null or undefined when invoke via call/apply/bind.


| Param | Description |
| --- | --- |
| ...others | Iterable, iterator, generator function, array-like object, or single value to concatenate into new sequence. If omitted, the method returns the existing sequence. |

**Example**  
```js
const seq = Seq.of(1, 2, 3);
const result = seq.concat([4, 5, 6], { seven: 7 }, [[8], [9]], [[[10], [11]]]);
console.log(result.toArray());
// => [ 1, 2, 3, 4, 5, 6, { seven: 7 }, [ 8 ], [ 9 ], [ [ 10 ], [ 11 ] ] ]
```
* <h3> countBy(projection) ⇒ Seq </h3>
Applies a key-generating function to each element of a sequence and returns a sequence yielding unique keys and their number of occurrences in the original sequence.
This method should not be used with large or infinite sequences.

**Returns**: <code>Seq</code> - The result sequence.  
**Throws**:

- <code>TypeError</code> If the source sequence is null or undefined when invoke via call/apply/bind; or projection is a generator function or not a function.


| Param | Description |
| --- | --- |
| projection | A function transforming each item of the input sequence into a key to be compared against the others. |

**Example**  
```js
class Person {
  constructor(name) {
    this.Name = name;
  }
}
const mrA = new Person('A', 20);
const mrB = new Person('B', 15);
const seq = Seq.of(mrA, mrA, mrB);
const nameCounts = seq.countBy(x => x.Name).toArray();
console.log(nameCounts)
// => [['A', 2], ['B', 1]]
```
<h3> Seq.empty() ⇒ Seq </h3>
Creates an empty sequence.

**Returns**: <code>Seq</code> - An empty sequence.  
**Example**  
```js
const emptySeq = Seq.empty();
console.log(emptySeq.toArray());
// => []
```
<h3>every(predicate) ⇒ Seq</h3>
Tests if all elements of the sequence satisfy the given predicate.

**Returns**: <code>boolean</code> - true if the callback function returns a truthy value for at least one element in the sequence. Otherwise, false.  
**Throws**:

- If the source sequence is null or undefined; or predicate is a generator function or not a function.


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
<h3>filter(predicate) ⇒ Seq</h3>
Returns a new sequence containing only the elements of the collection for which the given predicate returns "true".

**Returns**: <code>Seq</code> - The result sequence.  
**Throws**:

- <code>TypeError</code> If the source sequence is null or undefined when invoke via call/apply/bind; or predicate is a generator function or not a function.


| Param | Type | Description |
| --- | --- | --- |
| predicate | <code>function</code> | A function to test whether each item in the input sequence should be included in the output. |

**Example**  
```js
const seq = Seq.of(1,2,3,4,5).filter(x => x % 2 === 0);
console.log([...seq]);
// => [2, 4]
```
<h3> forEach(callback) ⇒ undefined </h3>
Applies the given function to each element of the collection.

**Throws**:

- <code>TypeError</code> If the source sequence is null or undefined when invoke via call/apply/bind; or predicate is a generator function or not a function.


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
<h3> Seq.from(source) ⇒ Seq </h3>
Create a new sequence wrapped a given source. The given source can be anything that implemented iterable protocol.

**Returns**: <code>Seq</code> - The return sequence.  
**Throws**:

- <code>TypeError</code> if source doesn't conform iterable protocol.


| Param | Description |
| --- | --- |
| source | Anything that implemented iterable protocol. |

Returns the first element of the sequence.

**Returns**: The first element of the sequence.  
**Example**  
```js
@exception {TypeError} If the source sequence is null or undefined when invoke via call/apply/bind.
const seq = Seq.of(1, 2, 3, 4, 5);
console.log(seq.head());
// => 1
```
<h3> init(count, initializer) ⇒ Seq </h3>
Generate a new sequence by invoking initializer function passed as the argument up to the given count.

**Returns**: <code>Seq</code> - The result sequence.  
**Throws**:

- <code>TypeError</code> if count is a negative number; or initializer is a generator function or not a function.


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
<h3> initInfinite(initializer) ⇒ Seq </h3>
Generate a new sequence by invoking initializer function passed as the argument.
The index of the item generated is passed to the initializer function.
The iteration can continue up to Number.MAX_SAFE_INTEGER.

**Returns**: <code>Seq</code> - The result sequence.  
**Throws**:

- <code>TypeError</code> if initializer a generator function or not a function.


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
<h3> isEmpty() ⇒ Boolean </h3>
Returns true if the sequence contains no elements, false otherwise.

**Returns**: <code>boolean</code> - True if the sequence is empty; false otherwise.  
**Throws**:

- <code>TypeError</code> if the existing sequence is null or undefined when invoke via call/apply/bind.

**Example**  
```js
console.log(Seq.empty().isEmpty());
// => true
```
<h3> last() ⇒ value </h3>
Returns the last element of a sequence.

**Returns**: The value at the last position in the source sequence.  
**Throws**:

- <code>TypeError</code> If the source sequence is null or undefined when invoke via call/apply/bind.

**Example**  
```js
const seq = Seq.range(0,10);
const last = seq.last();
console.log(last);
// => 9
```
<h3> lastBy(predicate) ⇒ Seq </h3>
Returns the last element of a sequence that satisfies a specified condition.

**Returns**: The last element in the sequence that passes the test in the specified predicate function.  
**Throws**:

- <code>TypeError</code> If the source sequence is null or undefined when invoke via call/apply/bind; or predicate is a generator function or not a function.


| Param | Description |
| --- | --- |
| predicate | A function to test each element for a condition. |

**Example**  
```js
const seq = Seq.of(1, 2, 42, 323, 423, 32, 23, 10, 11);
console.log(seq.lastBy(x => x % 2 === 0));
// => 10
```
<h3> length ⇒ Number </h3>
Returns the length of the sequence.

**Returns**: <code>number</code> - The length of the sequence.  
**Throws**:

- <code>TypeError</code> if the existing sequence is null or undefined when invoke via call/apply/bind.

**Example**  
```js
const seq = Seq.of(1,2,3);
console.log(seq.length);
// => 3;
```
<h3> map(callback) ⇒ Seq </h3>
The map method creates a new Seq populated with the results of calling a provided function on every element.
The provided function is invoked with two arguments: (item, index).

**Returns**: <code>Seq</code> - Return the new mapped sequence.  
**Throws**:

- <code>TypeError</code> If the source sequence is null or undefined when invoke via call/apply/bind; or callback is a generator function or not a function.


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
<h3>prepend([val1[,val2[,...[,valN]]]]) ⇒ Seq</h3>
Creates a new sequence with new values prepended.

**Returns**: <code>Seq</code> - A new sequence.  
**Throws**:

- <code>TypeError</code> if the existing sequence is null or undefined when invoke via call/apply/bind.


| Param | Description |
| --- | --- |
| ...others | Iterable, iterator, generator function, array-like object, or single value to prepend into new sequence. If omitted, the method returns the existing sequence. |

**Example**  
```js
const seq = Seq.of(4,5);
const prepended = seq.prepend([1,2], { three : 3 });
console.log(prepended.toArray());
// => [ 1, 2, { three: 3 }, 4, 5]
```
<h3>Seq.range(begin, end, step) ⇒ Seq</h3>
Creates a sequence of numbers starting from 'begin' to 'end', but not including, 'end'.
If 'end' is not defined, it is set to 'begin', and 'begin' is then set to 0.
'step' will be assigned to -1 if 'begin' is negative and 'end' is not defined.

**Returns**: <code>Seq</code> - The result sequence.  
**Throws**:

- <code>TypeError</code> if 'begin', 'end', and 'step' are not finite numbers when passed.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [begin] | <code>number</code> | <code>0</code> | The first number of the sequence |
| end | <code>number</code> |  | The end of the range of numbers. It won't include in the result sequence. |
| [step] | <code>number</code> | <code>1</code> | The value to increment or decrement by. |

**Example**  
```js
console.log(Seq.range(5).toArray());
// => [ 0, 1, 2, 3, 4 ]

console.log(Seq.range(-5).toArray());
// => [ 0, -1, -2, -3, -4 ]

console.log(Seq.range(1,5).toArray());
// => [ 1, 2, 3, 4 ]

console.log(Seq.range(0, 20, 5).toArray());
// => [ 0, 5, 10, 15 ]

console.log(Seq.range(0, -5, -1).toArray());
// => [ 0, -1, -2, -3, -4 ]

console.log(Seq.range(0).toArray());
// => []

console.log(Seq.range(10, -5, -1).toArray());
// => [ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4 ]

console.log(Seq.range(-1, -2, -5).toArray());
// => [-1]
```
<h3> reduce(reducer) ⇒ Any </h3>
The method executes the provided reducer function on each element of the sequence, resulting in single output value.

**Returns**: A single value that results from reduction.  
**Throws**:

- <code>TypeError</code> If the source sequence is null or undefined when invoke via call/apply/bind; or reducer is a generator function or not a function; or when the source sequence is empty and initial value is not provided.


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
<h3>reverse() ⇒ Seq</h3>
Return a new sequence with the elements in reverse order.

**Returns**: <code>Seq</code> - The reversed sequence.  
**Throws**:

- <code>TypeError</code> if the source sequence is null or undefined when invoke via call/apply/bind.

**Example**  
```js
const seq = Seq.of(0, 1, 2, 3, 4);
console.log(seq.reverse().toArray());
// => [4, 3, 2, 1, 0]
```
<h3> some(predicate) ⇒ Seq </h3>
Tests if at least one element in the sequence passes the test implemented by the provided function.

**Returns**: <code>boolean</code> - true if the callback function returns a truthy value for at least one element in the sequence. Otherwise, false.  
**Throws**:

- If the source sequence is null or undefined when invoke via call/apply/bind; or predicate is a generator function or not a function.


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
Returns a new sequence containing all the elements of the existing sequence except the first.

**Returns**: <code>Seq</code> - The result sequence.  
**Example**  
```js
@exception {TypeError} If the source sequence is null or undefined when invoke via call/apply/bind.
const seq = Seq.of(1, 2, 3, 4, 5);
console.log(seq.tail().toArray());
// => [2, 3, 4, 5]
```
<h3> take(count) ⇒ Seq </h3>
Returns the first N elements of the sequence.

**Returns**: <code>Seq</code> - The result sequence.  
**Throws**:

- <code>TypeError</code> if the source sequence is null or undefined when invoke via call/apply/bind; or count is a negative number.


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
<h3> takeWhile(predicate) ⇒ Seq </h3>
Returns a sequence that, when iterated, yields elements of the underlying sequence while the given predicate returns True, and then returns no further elements.

**Returns**: <code>Seq</code> - The result sequence.  
**Throws**:

- <code>TypeError</code> If the source sequence is null or undefined when invoke via call/apply/bind; or predicate is a generator function or not a function.


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
<h3> toArray() ⇒ Seq </h3>
Create an array out of the sequence.

**Returns**: <code>Array</code> - The result array.  
**Throws**:

- <code>TypeError</code> if the existing sequence is null or undefined when invoke via call/apply/bind.

**Example**  
```js
const seq = Seq.of(1,2,3,4);
const arr = seq.toArray();
console.log(arr);
// => [1,2,3,4]
```
<h3> toString() ⇒ string </h3>
Returns a string representing upto 128 elements of the sequence. If the sequence contains
more than 128 elements, the string will end with '...'.

**Returns**: A string representing the elements of the sequence.  
**Throws**:

- <code>TypeError</code> If the source sequence is null or undefined when invoke via call/apply/bind.

**Example**  
```js
console.log(Seq.of(1,2,3).toString());
// => "1, 2, 3"
```
