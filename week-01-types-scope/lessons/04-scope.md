# Lesson 4 — Scope

> **Goal:** for any variable in any piece of code, know exactly which value you'll get, or why you get an error.
> **Time:** ~35 min · **Then:** `examples/04-scope.js` → `exercises/04-scope.js`

---

## 1. What is scope?

**Scope** is the part of the code where a variable is visible. It answers the question: *"if I write `x` here, which `x` do I get?"*

---

## 2. Kinds of scope

| Scope | Created by | Who lives there |
|---|---|---|
| **Global** | the whole program | `var` at the top level of a classic `<script>`; built-ins like `console`, `Math`, `window` |
| **Module** | every ES module file (has `import`/`export` or `"type": "module"`) | top-level `const`/`let`/`function` in that file — visible **only in that file** |
| **Function** | every function | parameters, plus `var`/`let`/`const`/`function` declared inside |
| **Block** | every `{ }`: `if`, `for`, `while`, or a bare block | **only `let` and `const`** (and `class`) |

**`var` ignores blocks.** It's scoped to the whole function:

```js
function demo() {
  if (true) {
    var a = 1;
    let b = 2;
    const c = 3;
  }
  console.log(a); // 1 — var "leaks" out of the if-block
  console.log(b); // ❌ ReferenceError: b is not defined
}
```

In modern projects (Vite, React, and this course) every file is a module, so your "top level" is module scope, not global. That's a good thing: two files can each have a `const config` without clashing.

---

## 3. Lexical scope

**Lexical** means scope is decided by **where the code is written**, not where it's **called from**. A function can see the variables of the code that surrounds it **in the source file**.

```js
const name = 'Ana';

function greet() {
  return `Hi, ${name}`;
}

function run() {
  const name = 'Ivan';
  return greet();
}

run(); // 'Hi, Ana'
```

`greet` was **written** next to the outer `name`, so that's the `name` it sees. It doesn't matter that it was **called** from inside `run`, where a different `name` exists. This one idea explains closures (week 2) and a lot of React behavior.

---

## 4. The scope chain

When JS looks up a variable, it starts in the **current** scope and moves **outward**, one level at a time, until it reaches the global scope. It never looks **inward** or **sideways**.

```js
const app = 'Shop';              // module scope

function outer() {
  const user = 'Ana';            // outer's scope

  function inner() {
    const item = 'Book';         // inner's scope
    return `${app}: ${user} bought ${item}`; // ✅ finds all three
  }

  console.log(item);             // ❌ ReferenceError — can't look inward
  return inner();
}
```

```
module scope:   app, outer
  └─ outer():   user, inner
       └─ inner():  item
            lookup order: item → user → app → global
```

If the variable isn't found anywhere along the chain, you get `ReferenceError: x is not defined`.

---

## 5. Shadowing

When an inner scope declares a variable with the **same name** as an outer one, the inner one **shadows** (hides) the outer one:

```js
const status = 'idle';

function load() {
  const status = 'loading'; // a NEW variable that hides the outer one
  console.log(status);      // 'loading'
}

load();
console.log(status);        // 'idle' — the outer one never changed
```

Shadowing is legal, but it causes bugs when you **meant** to update the outer variable:

```js
let isLoggedIn = false;

function login() {
  let isLoggedIn = true; // 🐛 creates a local variable; the outer one stays false
}
```

The fix is to drop `let`, so the line assigns to the outer variable: `isLoggedIn = true;`.

Parameters shadow too:

```js
let count = 0;
function increment(count) {  // this `count` is the parameter, not the outer variable
  count = count + 1;          // changes only the local copy
}
increment(count);
count; // 0
```

---

## 6. Assigning without declaring

In old non-strict scripts, a line like `total = 0` without `let`/`const` silently creates a **global** variable. That's a nightmare to debug.

In **strict mode** the same line throws `ReferenceError: total is not defined`. ES modules and classes are **always** strict, so in modern code this is caught immediately. Good. Always declare your variables.

---

## 7. Block scope in loops

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 0 1 2 — with let, every iteration gets its OWN i

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 3 3 3 — with var there's ONE i for the whole function.
// The callbacks run after the loop has finished, when i is already 3.
```

*Why* the callbacks "remember" `i` at all is the topic of closures (week 2). For now: `let` in a loop means a fresh variable per iteration.

---

## 8. Best practices

- Declare every variable in the **smallest scope** that needs it.
- `const` by default, `let` when you reassign, never `var`.
- Don't create globals. Modules give you file-level scope for free.
- Avoid shadowing unless it's clearly intentional. Linters have a `no-shadow` rule for this.

---

## 🔗 In React

Every render of a component is a **function call** with its own scope. Event handlers created during a render see **that render's** variables:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    console.log(count); // logs the OLD value. `count` is a const in THIS render's scope.
  }

  return <button onClick={handleClick}>{count}</button>;
}
```

`setCount` schedules a **new** render, which is a new function call with a new `count`. The current call's `count` never changes, because it's a `const`. Almost every junior gets confused by this, and it's just scope. You'll understand it completely after closures in week 2.

---

## Cheat sheet

```js
// var → function scope · let/const → block scope · top level of a module → module scope
// Lexical: a function sees variables where it's WRITTEN, not where it's CALLED
// Lookup goes outward only: current → parent → ... → global → ReferenceError
// Shadowing: an inner declaration with the same name hides the outer one
// Strict mode / modules: assigning an undeclared variable → ReferenceError (good!)
// for (let i ...) → a new i per iteration; for (var i ...) → one shared i
```

---

## ✅ Self-check

**1. What's the difference between `var` and `let` inside an `if` block?**
<details><summary>Answer</summary>

`let` is visible only inside the block. `var` is visible in the whole function, so it leaks out of the block.
</details>

**2. What does `run()` return, and why?**
```js
const color = 'red';
function getColor() { return color; }
function run() { const color = 'blue'; return getColor(); }
```
<details><summary>Answer</summary>

`'red'`. Lexical scope: `getColor` sees the `color` where it was written, not the one where it was called.
</details>

**3. Can an outer function read a variable declared inside an inner function?**
<details><summary>Answer</summary>

No. Lookup goes only outward. The outer function gets a `ReferenceError`.
</details>

**4. You wrote `let user = data;` inside a function, but the module-level `user` is still `null` afterwards. What happened?**
<details><summary>Answer</summary>

Shadowing. `let` created a new local `user` instead of assigning to the outer one. Remove `let`.
</details>

**5. Why is `total = 0` (without `let`) an error in an ES module but "works" in an old script?**
<details><summary>Answer</summary>

Modules are always in strict mode, where assigning to an undeclared variable throws. Old scripts in sloppy mode silently create a global variable instead.
</details>
