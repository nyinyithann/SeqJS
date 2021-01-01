<!--  ## Modules

<dl>
<dt><a href="#seq.module_map">map</a></dt>
<dd></dd>
<dt><a href="#seq.module_take">take</a></dt>
<dd></dd>
</dl>

-->
  ### map(callback) ⇒ Seq </br>
The map method creates a new Seq populated with the results of calling a provided function on every element.
The provided function is invoked with two arguments: (item, index).

**Returns**: <code>Seq</code> - Return the new mapped sequence.  
**Throws**:

- <code>TypeError</code> If callable is not a function.


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
### take(count) ⇒ Seq </br>
Returns the first N elements of the sequence.

**Returns**: <code>Seq</code> - The result sequence.  

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
