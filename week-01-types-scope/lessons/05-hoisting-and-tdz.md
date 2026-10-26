# Lesson 5 — Hoisting & the Temporal Dead Zone

> **Goal:** know what you can use before its declaration line, what you can't, and what error you'll see if you try.
> **Time:** ~35 min · **Then:** `examples/05-hoisting-and-tdz.js` → `exercises/05-hoisting-and-tdz.js`

---

## 1. JS reads your code before running it

Before JS runs a scope (a module, a function, a block), it first **scans** it and registers every declaration in it. Only after that does it run the code line by line.

- **Creation phase:** "There's a function `add`, a `var city`, a `const country`..."
- **Execution phase:** run line 1, line 2, line 3...

**Hoisting** is the name for the visible effect of this: some things can be used **before** the line where they're declared. How that works depends on how they were declared.

---

## 2. Each kind of declaration

| Declaration | Usable before its line? | Value before its line | Scope |
|---|---|---|---|
| `function f() {}` | ✅ yes | the whole function | function (block in strict mode) |
| `var x` | ⚠️ yes, but... | `undefined` | function |
| `let x` / `const x` | ❌ no — TDZ | uninitialized → `ReferenceError` | block |
| `class C {}` | ❌ no — TDZ | uninitialized → `ReferenceError` | block |
| `const f = () => {}` | ❌ no — follows `const` | TDZ → `ReferenceError` | block |
| `var f = function () {}` | ⚠️ follows `var` | `undefined` → calling it is a `TypeError` | function |

### Function declarations: fully hoisted

```js
console.log(add(2, 3)); // 5 ✅
function add(a, b) {
  return a + b;
}
```

### `var`: hoisted as `undefined`

```js
console.log(city); // undefined — no error!
var city = 'Sofia';
console.log(city); // 'Sofia'
```

JS treats this as if you had written:

```js
var city;          // the declaration moves to the top and starts as undefined
console.log(city);
city = 'Sofia';    // the assignment stays where it was
```

This **hides bugs**. You get a silent `undefined` instead of an error that points to the problem.

### `let` and `const`: the TDZ

```js
console.log(country); // ❌ ReferenceError: Cannot access 'country' before initialization
const country = 'BG';
```

The variable **is** registered from the start of the block (it is hoisted), but it stays **uninitialized** until its declaration line runs. The time between the start of the block and that line is the **Temporal Dead Zone (TDZ)**. Touching the variable during the TDZ throws a `ReferenceError`.

**Proof that `let`/`const` are hoisted:**

```js
const level = 'outer';

function test() {
  console.log(level); // ❌ ReferenceError — NOT 'outer'!
  const level = 'inner';
}
```

If the inner `level` weren't hoisted, this would print `'outer'`. Instead, the inner `level` already exists and shadows the outer one from the first line of `test`, but it's still in the TDZ.

### Function expressions and arrow functions

They follow the rules of the variable that holds them:

```js
greet();  // ❌ ReferenceError (TDZ) — greet is a const
const greet = () => 'hi';

hello();  // ❌ TypeError: hello is not a function — it's a var, so it's undefined right now
var hello = function () { return 'hi'; };
```

### Read the error message, it tells you which problem you have

| Message | Meaning |
|---|---|
| `x is not defined` | there's no `x` in any reachable scope (typo? missing import? wrong scope?) |
| `Cannot access 'x' before initialization` | `x` exists, but you used it before its `let`/`const`/`class` line ran (TDZ) |
| `x is not a function` | `x` exists, but it isn't a function right now (for example a `var` that's still `undefined`) |

---

## 3. "Temporal": it's about time, not position

```js
function getTax() {
  return price * 0.2; // uses price, which is declared BELOW
}

const price = 100;
getTax(); // 20 ✅
```

This works, because the TDZ is about **when** code runs, not **where** it's written. `getTax` only reads `price` when it's **called**, and by then the `const price` line has already run.

Writing a reference to a later `const` inside a function is fine, as long as the function isn't **called** before that declaration runs.

---

## 4. `typeof` and the TDZ

```js
typeof neverDeclared  // 'undefined' — typeof is safe for variables that don't exist

typeof score          // ❌ ReferenceError — score is in the TDZ
let score = 10;
```

---

## 5. Why does the TDZ exist?

To turn "used before declared" into a **loud error** instead of a silent `undefined` like `var` gives you. Bugs that crash early are cheap to fix, while bugs that hide are expensive. The TDZ also makes `const` meaningful: a `const` never has two values (first `undefined`, then the real one).

---

## 6. Practical rules

1. Declare variables at the top of their scope, before you use them.
2. `const` / `let`, never `var`.
3. You can call function declarations before they're defined. Some teams use this on purpose to put the main logic at the top of a file and the helpers below it. That's fine.
4. When you see `Cannot access 'x' before initialization`, you're using something before its `const`/`let` line ran. Move the declaration up, or move the usage down.

---

## 🔗 In React

Components are usually `function MyComponent()` or `const MyComponent = () => ...`. React calls them later, when it renders, so the order of components in a file rarely matters inside JSX.

But code that **runs immediately** at the top level of a module can hit the TDZ:

```jsx
const routes = [{ path: '/', element: <Home /> }]; // ❌ ReferenceError — Home isn't initialized yet
const Home = () => <h1>Home</h1>;
```

And inside a component:

```jsx
function Profile() {
  const fullName = formatName(user); // ❌ ReferenceError — user is used before its line
  const user = useUser();
}
```

---

## Cheat sheet

```js
// function declarations → fully hoisted, callable anywhere in their scope
// var                   → hoisted as undefined (silent bugs)
// let / const / class   → hoisted but in the TDZ until their line → ReferenceError
// const f = () => {}    → TDZ, like any const
// var f = function(){}  → undefined → "f is not a function"

// TDZ = time, not position: a function can reference a later const,
//       as long as it's CALLED after that const's line ran

// "x is not defined"                        → doesn't exist
// "Cannot access 'x' before initialization" → TDZ
// "x is not a function"                     → exists, but isn't a function (yet)
```

---

## ✅ Self-check

**1. What's printed?**
```js
console.log(typeof sayHi);
function sayHi() {}
```
<details><summary>Answer</summary>

`'function'`. Function declarations are fully hoisted.
</details>

**2. What's the difference between the errors in these two snippets?**
```js
// A
console.log(a);
let a = 1;

// B
console.log(b);
```
<details><summary>Answer</summary>

A: `Cannot access 'a' before initialization`. `a` exists but is in the TDZ. B: `b is not defined`. `b` doesn't exist anywhere.
</details>

**3. Does this work? Why?**
```js
function total() { return items.length; }
const items = [1, 2, 3];
console.log(total());
```
<details><summary>Answer</summary>

Yes, it logs `3`. `total` is called after the `const items` line has run. The TDZ is about time, not position.
</details>

**4. Why is a ReferenceError (with `let`) better than `undefined` (with `var`)?**
<details><summary>Answer</summary>

The error points straight at the mistake. A silent `undefined` travels on through the code and causes a confusing bug somewhere else, like NaN or "cannot read properties of undefined".
</details>
