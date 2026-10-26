# Lesson 3 — Primitives vs References

> ⭐ **The most important lesson for React.** If you really understand this, you've already avoided half of the bugs juniors write in React.
> **Goal:** understand what's copied when you copy a value, and update objects and arrays without mutating them.
> **Time:** ~45 min · **Then:** `examples/03-primitives-vs-references.js` → `exercises/03-primitives-vs-references.js`

---

## 1. Two ways of storing values

- **Primitives** (string, number, boolean, null, undefined, bigint, symbol): the variable holds **the value itself**. Copying a variable copies the value.
- **Objects** (objects, arrays, functions...): the object lives in a separate memory area called the **heap**. The variable holds only a **reference**, which is like an address. Copying the variable copies the **address**, so both variables point to the **same object**.

```js
let a = 10;
let b = a;   // copies the value 10
b = 20;
a            // 10 — a has its own copy

const user1 = { name: 'Ana' };
const user2 = user1;  // copies the ADDRESS
user2.name = 'Ivan';
user1.name            // 'Ivan' 😱 — one object, two labels
```

```
 VARIABLES                      HEAP (objects)
┌─────────┬───────┐
│ a       │ 10    │
│ b       │ 20    │
│ user1   │ #A1 ──┼──┐      ┌─────────────────────────┐
│ user2   │ #A1 ──┼──┴────▶ │ #A1  { name: 'Ivan' }   │
└─────────┴───────┘         └─────────────────────────┘
```

(The real engine is more complicated, but this model predicts the behavior correctly. That's all you need.)

---

## 2. `const` and objects

`const` protects the **arrow**, meaning the reference. It doesn't protect the object the arrow points to.

```js
const user = { name: 'Ana' };
user.name = 'Ivan';   // ✅ changes the object; the arrow still points to the same place
user = { name: 'X' }; // ❌ TypeError — this would move the arrow
```

---

## 3. Comparing objects compares references

```js
{} === {}           // false — two different objects, two different addresses
[1, 2] === [1, 2]   // false

const a = { x: 1 };
const b = a;
a === b             // true — the same address
```

`===` on objects asks "is this **the same** object?", not "do they **look** the same?". To compare contents you have to compare the properties yourself.

---

## 4. Functions get a copy of the reference

```js
function rename(person) {
  person.name = 'Ivan';       // changes the CALLER's object!
}

const user = { name: 'Ana' };
rename(user);
user.name // 'Ivan'
```

```js
function replace(person) {
  person = { name: 'Petar' }; // points the LOCAL variable at a new object
}

replace(user);
user.name // still 'Ivan' — the caller's arrow didn't move
```

A function that changes its arguments has a **side effect**, and side effects are hard to track down. A good rule at Mid level: **a function should not mutate its inputs** unless that's its explicit job and its name says so.

---

## 5. Copying: shallow vs deep

### Shallow copy: copies one level

```js
const copy = { ...user };          // spread for objects
const listCopy = [...list];        // spread for arrays
const copy2 = Object.assign({}, user);
const listCopy2 = list.slice();
```

**Nested objects are still shared.** A shallow copy copies the *references* to them:

```js
const user = { name: 'Ana', address: { city: 'Sofia' } };
const copy = { ...user };

copy.name = 'Ivan';           // ✅ only the copy changes — name is a primitive
copy.address.city = 'Varna';  // 😱 user.address.city is now 'Varna' too
```

```
user ──▶ { name: 'Ana',  address: #B1 ──┐
                                        ├──▶ #B1 { city: 'Varna' }   ← shared!
copy ──▶ { name: 'Ivan', address: #B1 ──┘
```

### Deep copy: copies everything

```js
const deep = structuredClone(user);  // built into browsers and Node
deep.address.city = 'Burgas';        // user is not affected
```

`structuredClone` handles nested objects, arrays, `Date`, `Map`, `Set` and even circular references. It **doesn't** work for functions (it throws), DOM elements, or class instances (they come back as plain objects).

You'll also see the old trick `JSON.parse(JSON.stringify(obj))`. Avoid it: it drops `undefined` values and functions, and turns `Date`s into strings.

**But:** deep-copying everything all the time is wasteful. In real code you use **immutable updates** instead.

---

## 6. Immutable updates: the pattern you'll write every day

The idea: **don't change the existing object. Create a new one that contains the change.** Copy only the path that changes, and reuse everything else.

### Objects

```js
// Change a property
const updated = { ...user, age: 26 };

// Change a nested property: copy every level along the path
const moved = {
  ...user,
  address: { ...user.address, city: 'Varna' },
};
```

### Arrays

```js
// Add
const withNew = [...todos, newTodo];

// Remove
const without = todos.filter((todo) => todo.id !== id);

// Update one item
const toggled = todos.map((todo) =>
  todo.id === id ? { ...todo, done: !todo.done } : todo,
);
```

> `map` and `filter` get a full week (week 4). For now, learn the **shape** of these patterns. A plain `for` loop that builds a new array works too.

### Structural sharing

In `moved` above, `moved.address` is a **new** object, because it changed. Everything that didn't change is the **same** reference as before. In the `toggled` array, only the toggled todo is a new object, and all the others are the same objects as in the original array.

This is a **feature**, not laziness. React can compare references cheaply and skip the parts that didn't change.

---

## 7. Mutating vs non-mutating array methods

| ❌ Mutate the original (avoid on state) | ✅ Return a new array |
|---|---|
| `push`, `unshift` | `[...arr, x]`, `[x, ...arr]` |
| `pop`, `shift`, `splice` | `slice`, `filter`, `toSpliced` |
| `sort` | `toSorted`, `[...arr].sort()` |
| `reverse` | `toReversed` |
| `arr[i] = x` | `with(i, x)`, `map` |
| `fill`, `copyWithin` | |

`toSorted`, `toReversed`, `toSpliced` and `with` are newer (ES2023) and work in all modern browsers and in Node 20+.

⚠️ **`sort` is the sneaky one.** People forget that it changes the original array *and* returns it, so the code looks like it creates a new array when it doesn't.

---

## 🔗 In React

React decides whether to re-render by comparing the old and new state with `Object.is`, which is a **reference** comparison.

```jsx
const [user, setUser] = useState({ name: 'Ana', age: 25 });

// ❌ Mutation: same object, same reference. React thinks nothing changed → no re-render.
user.age = 26;
setUser(user);

// ✅ New object → new reference → React re-renders
setUser({ ...user, age: 26 });
```

```jsx
const [todos, setTodos] = useState([]);

todos.push(newTodo);            // ❌
setTodos(todos);

setTodos([...todos, newTodo]);  // ✅
```

`useEffect` dependencies, `React.memo` and `useMemo` all compare by reference too. That's why `{}` or `[]` written inline creates a "new value on every render".

---

## Cheat sheet

```js
// Primitives are copied by value; objects are copied by reference
// === on objects: "is it the SAME object?", not "is it equal?"
// const protects the variable, not the object

// Shallow copy                  // Deep copy
{ ...obj }   [...arr]            structuredClone(obj)

// Immutable updates
{ ...user, age: 26 }                                        // property
{ ...user, address: { ...user.address, city: 'Varna' } }    // nested
[...list, item]                                             // add
list.filter((x) => x.id !== id)                             // remove
list.map((x) => (x.id === id ? { ...x, done: true } : x))   // update one

// Mutating: push pop shift unshift splice sort reverse fill arr[i]=
// New array: slice filter map toSorted toReversed toSpliced with
```

---

## ✅ Self-check

**1. What does this log?**
```js
const a = [1, 2];
const b = a;
b.push(3);
console.log(a);
```
<details><summary>Answer</summary>

`[1, 2, 3]`. `a` and `b` point to the same array.
</details>

**2. You do `const copy = { ...user }` and then `copy.tags.push('new')`. Does `user.tags` change? Why?**
<details><summary>Answer</summary>

Yes. A spread is a shallow copy, so `copy.tags` and `user.tags` are the same array.
</details>

**3. Write an immutable update that sets `user.settings.theme` to `'dark'`.**
<details><summary>Answer</summary>

```js
const updated = { ...user, settings: { ...user.settings, theme: 'dark' } };
```
</details>

**4. Why doesn't `user.age = 26; setUser(user);` re-render in React?**
<details><summary>Answer</summary>

React compares the old and new state by reference. It's the same object, so React sees no change and skips the render.
</details>

**5. Name 3 array methods that mutate the array, and their non-mutating alternatives.**
<details><summary>Answer</summary>

`push` → `[...arr, x]`; `sort` → `toSorted()`; `reverse` → `toReversed()`; `splice` → `toSpliced()` or `filter`/`slice`.
</details>
