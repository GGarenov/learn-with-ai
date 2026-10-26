# Lesson 1 — Values and Types

> **Goal:** know the 8 types in JavaScript, check them reliably, and know the quirks that cause real bugs.
> **Time:** ~30 min · **Then:** `examples/01-values-and-types.js` → `exercises/01-values-and-types.js`

---

## 1. Values have types, variables don't

JavaScript is **dynamically typed**. A variable is just a label that points to a value. The *value* has the type, not the variable.

```js
let data = 42;       // data points to a number
data = 'forty-two';  // now it points to a string — JS doesn't complain
```

That's flexible, but it also means nothing stops you from passing a string where a number was expected. You find out at runtime, usually as a bug. (Fixing that is the reason TypeScript exists. You'll learn it after React.)

---

## 2. The 8 types

| Type | Examples | Notes |
|---|---|---|
| `string` | `'hi'`, `"hi"`, `` `hi ${name}` `` | text; immutable |
| `number` | `42`, `3.14`, `-7`, `NaN`, `Infinity` | one type for integers *and* decimals |
| `bigint` | `9007199254740993n` | huge integers; rare in app code |
| `boolean` | `true`, `false` | |
| `undefined` | `undefined` | "no value assigned yet" |
| `null` | `null` | "intentionally empty" |
| `symbol` | `Symbol('id')` | unique keys; rare in app code |
| `object` | `{}`, `[]`, `function () {}`, `new Date()`, `new Map()` | everything that isn't one of the above |

The first 7 are called **primitives**. Everything else is an **object**: plain objects, arrays, functions, dates, maps. The difference between primitives and objects matters a lot, and it's the whole topic of Lesson 3.

---

## 3. Checking types with `typeof`

```js
typeof 'hello'       // 'string'
typeof 42            // 'number'
typeof 10n           // 'bigint'
typeof true          // 'boolean'
typeof undefined     // 'undefined'
typeof Symbol()      // 'symbol'
typeof {}            // 'object'
typeof function () {} // 'function'  ← functions are objects, but typeof gives them their own label
```

Three traps you have to remember:

```js
typeof null  // 'object'  ← a bug from 1995. It can never be fixed, because fixing it would break old websites.
typeof []    // 'object'  ← arrays are objects
typeof NaN   // 'number'  ← "Not a Number" is... a number
```

So these are the **reliable** checks:

| You want to know if `x` is... | Use |
|---|---|
| `null` | `x === null` |
| an array | `Array.isArray(x)` |
| `NaN` | `Number.isNaN(x)` |
| a real, usable number | `Number.isFinite(x)` (false for `NaN`, `Infinity` and non-numbers) |
| `null` or `undefined` | `x === null \|\| x === undefined` (or `x == null`, see Lesson 2) |
| a plain object | `x !== null && typeof x === 'object' && !Array.isArray(x)` |

---

## 4. Numbers: the weird parts

### There is only one number type

`5` and `5.0` are the same value. All numbers are 64-bit floating point numbers.

### Floating point math isn't exact

```js
0.1 + 0.2          // 0.30000000000000004
0.1 + 0.2 === 0.3  // false
```

This isn't a JavaScript bug. Almost every programming language does the same thing. A decimal like `0.1` can't be stored exactly in binary, the same way `1/3` can't be written exactly in decimal (0.3333…).

**What you do about it in practice:**

- **Money:** store and calculate in **cents**, as whole numbers. Use `1999` instead of `19.99`.
- **Display:** round at the end with `(0.1 + 0.2).toFixed(2)`, which gives `'0.30'`. Note that the result is a **string**.
- **Round to 2 decimals and keep a number:** `Math.round(x * 100) / 100`.

### NaN

You get `NaN` when a math operation fails:

```js
Number('hello')  // NaN
0 / 0            // NaN
undefined + 1    // NaN
```

It's the only value in JavaScript that isn't equal to itself:

```js
NaN === NaN            // false
Number.isNaN(NaN)      // true ✅
Number.isNaN('hello')  // false ✅ — 'hello' is a string, not NaN
isNaN('hello')         // true ⚠️ — the old global isNaN converts to a number first. Avoid it.
```

NaN spreads. Any math that involves NaN gives NaN. A single `undefined` in a list of prices turns the whole total into NaN. You'll hunt exactly this bug in Lesson 6.

### Infinity and safe integers

```js
1 / 0                       // Infinity  (no error!)
Number.isFinite(Infinity)   // false
Number.MAX_SAFE_INTEGER     // 9007199254740991
```

Integers above `MAX_SAFE_INTEGER` lose precision. That's why very large IDs from a database or API are often sent as strings.

---

## 5. `undefined` vs `null`

Both mean "no value". The difference is **who** set it.

- **`undefined`** is set by JavaScript. It means "nothing has been assigned here yet".
- **`null`** is set by you. It means "this is empty on purpose".

```js
let x;
x                      // undefined — declared, never assigned

const user = {};
user.email             // undefined — the property doesn't exist

function greet(name) {
  return name;
}
greet()                // undefined — argument not passed

function doNothing() {}
doNothing()            // undefined — no return

let selectedUser = null; // nobody is selected yet, and that's intentional
```

**Rule of thumb:** don't assign `undefined` yourself. Use `null` when something is empty on purpose. Many browser APIs return `null` for "not found": `document.querySelector()`, `localStorage.getItem()`, `'abc'.match(/x/)`.

---

## 6. `const`, `let` (and why not `var`)

```js
const name = 'Ana';  // can't be reassigned
let age = 25;        // can be reassigned

age = 26;            // ✅
name = 'Ivan';       // ❌ TypeError: Assignment to constant variable.
```

- Use **`const` by default.** It tells the reader that this name never points to anything else.
- Use **`let`** only when you really reassign, for example counters or totals.
- **Don't use `var`.** It ignores block scope and hoists in a confusing way. Lessons 4 and 5 show why.

⚠️ `const` stops you from reassigning the **variable**. It does not freeze the **value**:

```js
const user = { name: 'Ana' };
user.name = 'Ivan'; // ✅ allowed! The object changed. The variable still points to the same object.
user = {};          // ❌ TypeError — this would reassign the variable
```

Lesson 3 explains why.

---

## 7. Strings and template literals

Strings are immutable. String methods never change the original string, they return a new one:

```js
const s = 'hello';
s.toUpperCase();  // 'HELLO'
s                 // still 'hello'
```

Template literals use backticks. They let you insert values with `${...}` and write strings over several lines:

```js
const name = 'Ana';
const count = 3;
`${name} has ${count} item${count === 1 ? '' : 's'}`  // 'Ana has 3 items'
```

Anything can go inside `${}` as long as it's an expression: a function call, a ternary, or math.

---

## 🔗 In React

- React renders **nothing** for `null`, `undefined`, `true` and `false`. That's why `{isOpen && <Modal />}` works: when `isOpen` is `false`, React renders `false`, which shows nothing.
- But React **does** render numbers, including `0` and `NaN`. That leads to a famous bug that Lesson 2 covers.
- `return null` is the standard way for a component to render nothing: `if (!user) return null;`
- When a prop can be different kinds of values, you check it with `typeof`: `typeof children === 'function'`.

---

## Cheat sheet

```js
// The 3 typeof traps
typeof null === 'object'   // → use x === null
typeof []   === 'object'   // → use Array.isArray(x)
typeof NaN  === 'number'   // → use Number.isNaN(x)

// Usable number?
Number.isFinite(x)         // false for NaN, ±Infinity, and anything that isn't a number

// Money
Math.round(x * 100) / 100  // round to 2 decimals, still a number
x.toFixed(2)               // round to 2 decimals → STRING, for display

// undefined = JS says "not assigned"; null = you say "empty on purpose"
// const by default, let when you reassign, never var
```

---

## ✅ Self-check

Answer in your head (or out loud) first, then open the answer.

**1. What does `typeof null` return, and how do you check for `null` correctly?**
<details><summary>Answer</summary>

`'object'`, because of a historical bug. Check with `x === null`.
</details>

**2. Why is `0.1 + 0.2 !== 0.3`? How would you store prices in a shopping cart?**
<details><summary>Answer</summary>

Numbers are binary floating point, so 0.1 and 0.2 can't be stored exactly. For prices, use integer cents, and round only when you display.
</details>

**3. How do you check whether a value is `NaN`? Why not `value === NaN`?**
<details><summary>Answer</summary>

Use `Number.isNaN(value)`. `NaN === NaN` is `false`, because NaN is never equal to anything, not even itself.
</details>

**4. Is this allowed? `const arr = [1, 2]; arr.push(3);`**
<details><summary>Answer</summary>

Yes. `const` only stops you from reassigning `arr`. The array it points to can still change.
</details>

**5. Name two situations where you get `undefined` without writing it yourself.**
<details><summary>Answer</summary>

A variable that was declared but never assigned. A property that doesn't exist. An argument that wasn't passed. A function without `return`.
</details>
