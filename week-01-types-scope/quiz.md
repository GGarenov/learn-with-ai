# Week 1 — Quiz

**Closed book:** no lessons, no notes, no running code, no AI. ~60 min.
Write your answers under each question. "I don't know" is better than a hidden guess. Mark guesses with `(guess)`.
When you're done, commit and say **"Check my week 1 quiz"**.

| Part | Points |
|---|---|
| A — Predict the output | 12 × 1 = 12 |
| B — Explain | 6 × 3 = 18 |
| C — Code review | 10 |
| D — Write code | 10 |
| **Total** | **50** |

**≥ 40:** great, on to week 2. **30–39:** on to week 2, with the weak spots added to your daily review. **< 30:** we spend 1–2 extra days on week 1. That's not a failure, it's what the quiz is for.

---

## Part A — Predict the output

If the code throws, write the error type. If it prints several things, list all of them in order.

### A1
```js
console.log(typeof typeof 1);
```
**Answer:**

### A2
```js
console.log([] == false, [] ? 'yes' : 'no');
```
**Answer:**

### A3
```js
console.log(1 < 2 < 3, 3 > 2 > 1);
```
**Answer:**

### A4
```js
console.log('b' + 'a' + +'a' + 'a');
```
**Answer:**

### A5
```js
const a = [1, 2];
const b = a;
b.push(3);
console.log(a.length, a === b);
```
**Answer:**

### A6
```js
const original = { tags: ['js'] };
const copy = { ...original };
copy.tags.push('react');
copy.tags = ['new'];
console.log(original.tags);
```
**Answer:**

### A7
```js
let x = 1;
{
  let x = 2;
}
console.log(x);
```
**Answer:**

### A8
```js
console.log(foo());
function foo() {
  return bar;
}
var bar = 'bar';
```
**Answer:**

### A9
```js
const value = 'outer';
function test() {
  console.log(value);
  const value = 'inner';
}
test();
```
**Answer:**

### A10
```js
function update(obj, num) {
  obj.count++;
  num++;
}
const o = { count: 0 };
let n = 0;
update(o, n);
console.log(o.count, n);
```
**Answer:**

### A11
```js
console.log('' || 0 || null, '' ?? 'default');
```
**Answer:**

### A12
```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i));
}
console.log('done', i);
```
**Answer:**

---

## Part B — Explain (in your own words)

Write as if you were explaining it to a junior colleague. Short answers with an example beat long answers without one.

### B1
What's the difference between `null` and `undefined`? When do you use `null` yourself?

**Answer:**

### B2
Why is `[] === []` false while `'a' === 'a'` is true?

**Answer:**

### B3
What is lexical scope? Give a short example where it matters.

**Answer:**

### B4
What is the TDZ, and why is it a good thing that it exists?

**Answer:**

### B5
When would you use `??` instead of `||`? Give a real example from a UI.

**Answer:**

### B6
Explain the difference between a shallow and a deep copy. Why is a shallow copy (with spread) usually enough when you update state in React?

**Answer:**

---

## Part C — Code review

A colleague opened a pull request with this function. Write review comments: **what's wrong, why it's a problem, and how to fix it.** There are at least 6 issues, from bugs to style.

```js
var TAX = 0.2;

function addToCart(cart, product, qty) {
  if (qty == 0) return cart;

  for (var i = 0; i < cart.items.length; i++) {
    if (cart.items[i].id == product.id) {
      cart.items[i].qty = cart.items[i].qty + qty;
      found = true;
    }
  }

  if (!found) {
    cart.items.push({ id: product.id, price: product.price, qty: qty });
  }

  cart.total = cart.total + product.price * qty * (1 + TAX);
  return cart;
}

// Usage: qty comes from an <input>
addToCart(cart, product, input.value);
```

**Your review comments:**

1.

---

## Part D — Write code

Write `mergeSettings(defaults, userSettings)`, which returns a **new** settings object:

- it has all keys from `defaults`, overridden by the ones in `userSettings`
- the nested `notifications` object is **merged** too, not replaced
- a user value of `null` or `undefined` must **not** override the default, but `false`, `0` and `''` **must**
- neither input may be mutated

You only need to handle the shape in the example: top-level values plus one nested `notifications` object.

```js
const defaults = {
  theme: 'light',
  fontSize: 14,
  notifications: { email: true, push: true },
};

const user = {
  theme: 'dark',
  fontSize: null,
  notifications: { push: false },
};

mergeSettings(defaults, user);
// → { theme: 'dark', fontSize: 14, notifications: { email: true, push: false } }
```

**Your code:**

```js

```
