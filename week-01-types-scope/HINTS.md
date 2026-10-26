# Week 1 — Hints

Open one hint at a time. Try again after each one before you open the next.
Hints for **predictions** are deliberately vague. Re-reading the lesson section is the hint.

---

## Exercise 1 — Values and types

### Task 1 — getType
<details><summary>Hint 1</summary>

Handle the three special cases first, then fall back to `typeof value`.
</details>
<details><summary>Hint 2</summary>

`value === null`, `Array.isArray(value)`, `Number.isNaN(value)` — each one gets an `if` that returns early.
</details>

### Task 2 — isValidNumber
<details><summary>Hint 1</summary>

Lesson 1, section 3: the table of reliable checks. One built-in function does almost all of the work.
</details>
<details><summary>Hint 2</summary>

`Number.isFinite` is already `false` for `NaN`, `Infinity` and for anything that isn't a number. Unlike the global `isFinite`, it doesn't convert strings.
</details>

### Task 3 — formatPrice
<details><summary>Hint 1</summary>

A parameter can have a default value: `function f(currency = 'EUR')`.
</details>
<details><summary>Hint 2</summary>

`amount.toFixed(2)` gives you a string with 2 decimals. Combine it with the currency in a template literal.
</details>

### Task 4 — addMoney
<details><summary>Hint 1</summary>

Multiply by 100, round to a whole number, divide by 100.
</details>

### Task 5 — isEmpty
<details><summary>Hint 1</summary>

Go through the cases in the order of the description: null/undefined → string → array → object → everything else is `false`.
</details>
<details><summary>Hint 2</summary>

String: `value.trim() === ''`. Array: `value.length === 0`. Object: `Object.keys(value).length === 0`. Check for arrays **before** objects. Why does the order matter?
</details>

### ⭐ Task 6 — countTypes
<details><summary>Hint 1</summary>

Start with `const counts = {}`. For each value, take `const type = getType(value)` and increase `counts[type]`.
</details>
<details><summary>Hint 2</summary>

The first time you see a type, `counts[type]` is `undefined`. `(counts[type] ?? 0) + 1` handles that.
</details>

---

## Exercise 2 — Coercion & equality

### Part 1 — Predictions
<details><summary>Hint</summary>

Lesson 2, sections 3–6. For `+`: "is either side a string?" For `==`: look at the list in section 5. For `||`, `&&` and `??`: they return one of the two values, not a boolean.
</details>

### Task 1 — toNumber
<details><summary>Hint 1</summary>

Split it by type: `typeof value === 'number'` → one rule, `typeof value === 'string'` → another, everything else → `null`.
</details>
<details><summary>Hint 2</summary>

For strings: `const trimmed = value.trim()`. If it's `''`, return `null`. Otherwise `const n = Number(trimmed)` and check it with `Number.isFinite(n)`.
</details>

### Task 2 — compact
<details><summary>Hint 1</summary>

Create an empty array, loop over the input, and `push` only truthy values. (Mutating your **own** new array is fine. The rule is about not mutating the **input**.)
</details>
<details><summary>Hint 2</summary>

There's a one-liner with `filter` and `Boolean`. You'll learn it in week 4, but try to look it up on MDN.
</details>

### Task 3 — withDefault
<details><summary>Hint</summary>

There's an operator made exactly for this. Lesson 2, section 6.
</details>

### Task 4 — sumInputs
<details><summary>Hint</summary>

Loop over the values. `const n = toNumber(value)`. Add it to the sum only if `n !== null`.
</details>

### ⭐ Task 5 — isSameValue
<details><summary>Hint 1</summary>

Two special cases. NaN is the only value where `x !== x`. And `1 / 0` is `Infinity`, while `1 / -0` is `-Infinity`.
</details>
<details><summary>Hint 2</summary>

If `a === b`: they are the same unless they're `0` and `-0`. Compare `1 / a` with `1 / b`. If `a !== b`: they are the same only if both are NaN, which is `a !== a && b !== b`.
</details>

---

## Exercise 3 — Primitives vs references

### Task 1 — updateName
<details><summary>Hint</summary>

Spread the user into a new object, then override one property. Lesson 3, section 6.
</details>

### Task 2 — addItem
<details><summary>Hint 1</summary>

You need a new cart **and** a new items array. A spread for each.
</details>
<details><summary>Hint 2</summary>

`{ ...cart, items: [...cart.items, item], total: cart.total + item.price }`. Make sure you understand why `cart.items.push(item)` would break the test, even inside a spread copy of the cart.
</details>

### Task 3 — updateCity
<details><summary>Hint</summary>

Copy every level on the path to `city`: the user, then the address. Don't touch `settings`, because a spread of the user already copies its reference.
</details>

### Task 4 — toggleTodo
<details><summary>Hint 1</summary>

Build a new array. For each todo: if it's the one with the matching id, push a **new** object with `done` flipped. Otherwise push the **same** todo object.
</details>
<details><summary>Hint 2</summary>

The flipped one: `{ ...todo, done: !todo.done }`. As a one-liner: `todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))`.
</details>

### Task 5 — removeAt
<details><summary>Hint 1</summary>

Option A: loop and skip the index. Option B: `[...array.slice(0, index), ...array.slice(index + 1)]`. Careful with negative indexes in option B: `slice(0, -1)` means "all but the last".
</details>
<details><summary>Hint 2</summary>

Handle the out-of-range case first: `if (index < 0 || index >= array.length) return [...array];`. Also check `array.toSpliced` on MDN.
</details>

### ⭐ Task 6 — isShallowEqual
<details><summary>Hint 1</summary>

`Object.keys(a)` and `Object.keys(b)`. Different lengths → `false`. Then check every key of `a`.
</details>
<details><summary>Hint 2</summary>

For each key: `if (!Object.is(a[key], b[key])) return false;`. Also check that `b` actually has the key: `Object.hasOwn(b, key)`. Otherwise `{ a: undefined }` and `{ b: undefined }` would look equal.
</details>

### ⭐ Task 7 — deepClone
<details><summary>Hint 1</summary>

Three cases: a primitive or `null` → return it as is. An array → a new array where each item is `deepClone(item)`. An object → a new object where each value is `deepClone(value)`.
</details>
<details><summary>Hint 2</summary>

`typeof value !== 'object' || value === null` → primitive. Check `Array.isArray` before you treat something as a plain object. For objects: `for (const key of Object.keys(value)) copy[key] = deepClone(value[key]);`
</details>

---

## Exercise 4 — Scope

### Part 1 — Predictions
<details><summary>Hint</summary>

For each snippet, ask: "Which scope is this variable declared in? Where was the function **written**?" Lesson 4, sections 2–5. One snippet is a sneak peek at week 2 (closures). Lexical scope alone is enough to answer it.
</details>

### Bug 1 — createCallbacks
<details><summary>Hint</summary>

How many `i` variables exist with `var`? And with `let`? Lesson 4, section 7.
</details>

### Bug 2 — getDiscount
<details><summary>Hint</summary>

Where is `discount` visible? Declare it once, **before** the `if`, and assign it in the branches. Or use a ternary.
</details>

### Bug 3 — countWords
<details><summary>Hint</summary>

Read the error message. This file is an ES module, so what mode is it in? Lesson 4, section 6.
</details>

### Bug 4 — login
<details><summary>Hint</summary>

How many variables called `currentUser` exist while `login` is running? Lesson 4, section 5.
</details>

---

## Exercise 5 — Hoisting & the TDZ

### Part 1 — Predictions
<details><summary>Hint</summary>

Use the table in Lesson 5, section 2. For each snippet, identify how the thing was declared: `function`, `var`, `let`/`const`, `class`. For h6, remember that the TDZ is about time, not position.
</details>

### Fix 1 — buildGreeting
<details><summary>Hint</summary>

When `format(name)` runs, has the `const format` line run yet? Two possible fixes: move the line, or turn `format` into a function declaration.
</details>

### Fix 2 — processOrder
<details><summary>Hint</summary>

The early `return` uses `total`, but which line declares it? For an empty order, you can simply return `0`.
</details>

### Fix 3 — calculateTotal
<details><summary>Hint</summary>

The inner `let total` creates a **new** variable inside the loop, and its right side reads that same new variable while it's still in the TDZ. You want to update the outer `total`.
</details>

### Fix 4 — findFirstNegative
<details><summary>Hint</summary>

You can `return` from inside a loop as soon as you find a negative number. After the loop, `return null`. You won't need the `found` variable at all.
</details>

---

## Exercise 6 — Bug hunt

Use the debugger first! These hints are for when you've found **where** something goes wrong but not **why**.

<details><summary>Hint — subtotal is NaN</summary>

What's the starting value of `subtotal`? What's `undefined + 25`?
</details>
<details><summary>Hint — the order is modified</summary>

Two lines write into `order`. One of them is a very well-known typo. The other converts the price "helpfully". Keep the converted price in a local `const` instead.
</details>
<details><summary>Hint — crash without a discount code</summary>

`order.discountCode` can be `undefined`. You can't call `.toUpperCase()` on `undefined`. Give it a fallback first: `(order.discountCode || '')`. In week 3 you'll learn `?.`.
</details>
<details><summary>Hint — the numbers are rounded to whole numbers</summary>

Look very carefully at the parentheses in `round2`. What gets divided by 100, and when?
</details>
<details><summary>Hint — getUserCity</summary>

`'3' === 3` is `false`, so convert the id before you compare. Then, what if no user was found, or the user has no `address`? Return `'Unknown'` before you try to read `.city`.
</details>
