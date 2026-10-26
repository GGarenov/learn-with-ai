# Lesson 2 — Conversion, Coercion & Equality

> **Goal:** predict what JS does when you mix types, know the 8 falsy values by heart, and never be surprised by `==` again.
> **Time:** ~40 min · **Then:** `examples/02-coercion-and-equality.js` → `exercises/02-coercion-and-equality.js`

---

## 1. Conversion vs coercion

- **Conversion** is explicit: you do it yourself, as in `Number('42')`.
- **Coercion** is implicit: JS does it for you when an operator gets a type it doesn't expect, as in `'42' * 1`.

Good code prefers **explicit conversion**, because then the code says what it means. To read other people's code, though, you also need to understand coercion.

---

## 2. Explicit conversion

### To a number

```js
Number('42')       // 42
Number('3.14')     // 3.14
Number('  7  ')    // 7      — whitespace is trimmed
Number('')         // 0      ⚠️ an empty string becomes 0, not NaN
Number('12px')     // NaN    — the whole string must be a number
Number(null)       // 0      ⚠️
Number(undefined)  // NaN
Number(true)       // 1
+'42'              // 42     — unary plus does the same as Number()

parseInt('12px', 10)   // 12   — reads digits until it hits something else
parseInt('3.99', 10)   // 3    — integers only
parseFloat('3.99kg')   // 3.99
parseInt('px12', 10)   // NaN  — must start with a number
```

When to use which:

- **`Number()`** is **strict**: the whole string has to be a number. Use it to validate input, but watch out for `''` and `null`, which both become `0`.
- **`parseInt` / `parseFloat`** are **lenient**: they pull a number out of the start of a string like `'12px'`. With `parseInt`, always pass the radix (`10`).

### To a string

```js
String(42)        // '42'
String(null)      // 'null'
String([1, 2])    // '1,2'
String({})        // '[object Object]'  ← the classic "why does my UI say [object Object]"
(42).toString()   // '42'
`${42}`           // '42'
```

### To a boolean

```js
Boolean('hello')  // true
!!'hello'         // true — two NOTs. You'll see this shortcut a lot.
```

---

## 3. Truthy & falsy

When a value is used as a condition (`if`, `&&`, `||`, `!`, ternary), JS converts it to a boolean.

**There are exactly 8 falsy values. Memorize them:**

```js
false   0   -0   0n   ''   null   undefined   NaN
```

**Everything else is truthy**, including these surprises:

```js
'0'        // truthy — a non-empty string
'false'    // truthy — a non-empty string
' '        // truthy — a space is a character
[]         // truthy — an empty array is still an object
{}         // truthy
-1         // truthy
```

```js
const items = [];
if (items) {
  console.log('runs!'); // runs, because an empty array is truthy
}
if (items.length > 0) {
  console.log('has items'); // ✅ the correct check
}
```

To check whether an object is empty, use `Object.keys(obj).length === 0`.

---

## 4. Implicit coercion: the rules that matter

### `+` with a string → string concatenation

If either side of `+` is a string, the result is a string:

```js
'5' + 3       // '53'
3 + '5'       // '35'
1 + 2 + '3'   // '33'   — left to right: 1 + 2 = 3, then 3 + '3' = '33'
'1' + 2 + 3   // '123'  — '1' + 2 = '12', then '12' + 3 = '123'
```

### `-`, `*`, `/`, `%` → always numbers

These operators only work with numbers, so they convert both sides:

```js
'5' - 3     // 2
'5' * '2'   // 10
'abc' - 1   // NaN
```

### `+` with objects and arrays → strings

```js
[] + []      // ''               — both become ''
[1, 2] + [3] // '1,23'           — '1,2' + '3'
[] + {}      // '[object Object]'
```

### The real-world bug

```js
const quantity = input.value;   // values from the DOM are ALWAYS strings: '2'
quantity + 1                    // '21' 🐛
Number(quantity) + 1            // 3 ✅
```

These sources always give you strings: input values, URL params, `localStorage`, `dataset` attributes.

---

## 5. Equality: `==` vs `===`

- **`===` (strict)** never converts. The two sides must have the same type **and** the same value.
- **`==` (loose)** converts the types first, using complicated rules.

```js
'10' == 10          // true
0 == ''             // true
0 == '0'            // true
'' == '0'           // false   ← so == isn't even consistent with itself
false == '0'        // true
null == undefined   // true
null == 0           // false
NaN == NaN          // false
```

**The rule: always use `===` and `!==`.**

There is one well-known exception: `x == null`. It's `true` only for `null` and `undefined`, so some codebases use it as a shortcut for `x === null || x === undefined`. Learn to recognize it. Whether you use it yourself is a team convention.

### `Object.is`

`Object.is` works like `===` but handles two edge cases correctly:

```js
NaN === NaN          // false
Object.is(NaN, NaN)  // true

0 === -0             // true
Object.is(0, -0)     // false
```

You'll rarely call it yourself, but **React uses `Object.is` to decide whether state changed.**

### Comparing objects

`===` on objects compares **references** (where the object lives in memory), not contents. `{ a: 1 } === { a: 1 }` is `false`. That's Lesson 3.

---

## 6. Logical operators return values, not booleans

This surprises a lot of people:

- **`||`** returns the **first truthy** value. If there isn't one, it returns the last value.
- **`&&`** returns the **first falsy** value. If there isn't one, it returns the last value.
- **`??`** returns the **right** side only when the left side is `null` or `undefined`.

```js
'Ana' || 'Guest'   // 'Ana'
'' || 'Guest'      // 'Guest'
0 || 10            // 10   ⚠️ 0 is falsy
0 ?? 10            // 0    ✅ 0 is not null or undefined
null ?? 10         // 10

'a' && 'b'         // 'b'
'' && 'b'          // ''
```

**Short-circuiting:** the right side isn't evaluated at all if the result is already decided.

```js
isLoggedIn && showDashboard();   // showDashboard runs only if isLoggedIn is truthy
const name = user.name || fetchDefaultName(); // fetchDefaultName runs only if name is falsy
```

### `||` vs `??` for default values

```js
function setVolume(volume) {
  const v1 = volume || 50;  // 🐛 setVolume(0) gives 50
  const v2 = volume ?? 50;  // ✅ setVolume(0) gives 0
}
```

- Use **`??`** when `0`, `''` or `false` are valid values that should be kept.
- Use **`||`** when every falsy value should be replaced, for example turning an empty display name into `'Anonymous'`.

---

## 🔗 In React

**The famous zero bug:**

```jsx
{messages.length && <MessageList messages={messages} />}
```

When there are no messages, `messages.length` is `0`. `0 && ...` returns `0`, and React **renders the number 0** on the page. The fix is a real boolean:

```jsx
{messages.length > 0 && <MessageList messages={messages} />}
```

**Defaults:** `props.pageSize ?? 20` is right when `0` is meaningful. `props.pageSize || 20` would replace `0` with `20`.

**Forms:** `event.target.value` is always a string, even for `<input type="number">`. Convert it before doing math.

---

## Cheat sheet

```js
// 8 falsy values
false 0 -0 0n '' null undefined NaN        // everything else is truthy, even '0', [], {}

// Conversions
Number('')     // 0 ⚠️      Number('12px')       // NaN
Number(null)   // 0 ⚠️      parseInt('12px', 10) // 12

// + with a string concatenates; - * / % convert to numbers
'5' + 3  // '53'          '5' - 3  // 2

// Always ===. Only exception some teams allow: x == null (null or undefined)

// || first truthy · && first falsy · ?? right side only for null/undefined
0 || 10  // 10            0 ?? 10  // 0

// React: {count > 0 && ...}, never {count && ...}
```

---

## ✅ Self-check

**1. List the 8 falsy values.**
<details><summary>Answer</summary>

`false`, `0`, `-0`, `0n`, `''`, `null`, `undefined`, `NaN`.
</details>

**2. What's the result of `'3' + 4 + 5`? And `3 + 4 + '5'`?**
<details><summary>Answer</summary>

`'345'` — the string comes first, so everything after it is concatenated. `'75'` — first 3 + 4 = 7, then 7 + '5' = '75'.
</details>

**3. A user can set their age to `0` in a form... and your code shows "Age: not set". What's the likely bug?**
<details><summary>Answer</summary>

Something like `age || 'not set'`. `0` is falsy, so `||` replaces it. Use `age ?? 'not set'`.
</details>

**4. Why does `Number('')` cause bugs when you validate form input?**
<details><summary>Answer</summary>

It returns `0`, not `NaN`, so an empty field looks like a valid number. Check for an empty or whitespace-only string first.
</details>

**5. What does `null && user.name` return? Does it throw?**
<details><summary>Answer</summary>

It returns `null` and doesn't throw. `&&` stops at the first falsy value, so `user.name` is never evaluated.
</details>
