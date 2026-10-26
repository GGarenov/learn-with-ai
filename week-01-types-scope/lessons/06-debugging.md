# Lesson 6 — Debugging Like a Mid Developer

> **Goal:** read errors and stack traces fluently, and use breakpoints instead of guessing with `console.log`.
> **Time:** ~45 min (with practice) · **Then:** `examples/06-debug-me.js` + `06-debug-me.html` → `exercises/06-debugging.js`

A Junior debugs by adding `console.log`s until the bug shows up. A Mid developer **reads the error**, **forms a hypothesis**, and **checks it with the debugger**. Doing it that way is several times faster.

---

## 1. Read the error first

The most common runtime errors:

| Error | Meaning | Typical cause |
|---|---|---|
| `TypeError: Cannot read properties of undefined (reading 'name')` | you wrote `x.name`, but `x` is `undefined` | missing data, a typo in a property name, data that hasn't loaded yet, a search that found nothing |
| `TypeError: x is not a function` | you called something that isn't a function | a typo, a wrong import, a `var` that's still `undefined` |
| `ReferenceError: x is not defined` | there's no `x` in any reachable scope | a typo, out of scope, a missing import, a missing `let`/`const` in strict mode |
| `ReferenceError: Cannot access 'x' before initialization` | TDZ | used before its `let`/`const` line |
| `TypeError: Assignment to constant variable.` | you reassigned a `const` | use `let`, or don't reassign |
| `SyntaxError: ...` | the code can't even be parsed | a missing bracket, a comma, a quote |

**"Cannot read properties of undefined" is the #1 error in JavaScript and in React.** When you see it, don't look at the property, look at the thing **before the dot**. Why is it `undefined`?

### Stack traces

```
TypeError: Cannot read properties of undefined (reading 'city')
    at getCity (file:///D:/IT/2026/learn_with_ai/app.js:3:23)    ← where it crashed
    at showUser (file:///D:/IT/2026/learn_with_ai/app.js:8:10)   ← who called getCity
    at file:///D:/IT/2026/learn_with_ai/app.js:11:1              ← who called showUser
```

- Read it **top to bottom**. The first line in **your** code is where to start.
- `app.js:3:23` means line 3, column 23. In the VS Code terminal, `Ctrl+click` the path to jump there.
- The lines below tell you **how you got there**. Often the real bug is a line or two down: the caller passed bad data.

---

## 2. A process, not luck

1. **Reproduce.** Find the exact input that triggers the bug. A failing test is the best reproduction there is.
2. **Isolate.** Where does a value go wrong? Narrow it down to one function, then one line.
3. **Hypothesize.** "I think `total` becomes NaN because one of the prices is `undefined`."
4. **Verify.** Check the hypothesis with the debugger. **Don't change code based on a guess.**
5. **Fix the cause**, not the symptom. `total || 0` hides a NaN. Fixing the missing price removes it.
6. **Test.** Re-run, and add a test for that case if there isn't one.

---

## 3. `console` beyond `console.log`

```js
console.log({ user, cart });   // object shorthand gives you labels for free
console.table(users);          // an array of objects as a table
console.error('Save failed', error);
console.warn('Deprecated: use formatPrice()');
console.group('Checkout');     // indents everything until groupEnd
console.groupEnd();
console.time('load');          // ... code ...
console.timeEnd('load');       // load: 12.3ms
console.trace('How did we get here?'); // prints the current call stack
console.assert(total >= 0, 'total is negative:', total); // logs only if the condition is false
```

⚠️ **Browser gotcha (Lesson 3 in action):** in Chrome, `console.log(obj)` keeps a **reference** to the object. If you expand it later, you see the object's **current** values, not the values it had when it was logged. To capture a snapshot, log `structuredClone(obj)` or `JSON.stringify(obj)`.

---

## 4. The debugger: pause time and look around

With `console.log` you guess where to look, edit the code, re-run, and repeat. With a debugger you **pause** the program and see **every** variable at that moment. Then you move forward one line at a time.

### In VS Code (Node code and tests): the easiest way

1. `Ctrl+Shift+P` → **"Debug: JavaScript Debug Terminal"**. This opens a special terminal.
2. Click to the left of a line number to set a **breakpoint** (a red dot).
3. In that terminal, run your code as usual:
   ```bash
   node week-01-types-scope/examples/06-debug-me.js
   node --test week-01-types-scope/exercises/06-debugging.test.js
   ```
4. Execution pauses on the breakpoint. In the left sidebar you'll find:
   - **Variables**: every variable in every scope (Local, Closure, Module, Global)
   - **Watch**: expressions you want to track, like `item.price * item.quantity`
   - **Call Stack**: how you got here (the live version of a stack trace)

| Key | Action | Meaning |
|---|---|---|
| `F5` | Continue | run until the next breakpoint |
| `F10` | Step Over | go to the next line without entering the functions it calls |
| `F11` | Step Into | enter the function called on this line |
| `Shift+F11` | Step Out | finish the current function and go back to its caller |

- **Hover** over any variable in the editor to see its value.
- **Debug Console** (bottom panel): type any expression and it's evaluated in the paused scope, for example `items.length` or `typeof price`.

### The `debugger` statement

Write `debugger;` on a line. When a debugger is attached, execution pauses there. Remove it before you commit!

### In Chrome DevTools (browser code)

`F12` → **Sources** tab → `Ctrl+P` to open a file → click a line number. The keys are the same idea (`F8` resume, `F10` over, `F11` into, `Shift+F11` out). The **Scope** panel shows Local / Closure / Script / Global, and you'll use it a lot in week 2.

Practice with `examples/06-debug-me.html`: open it in Chrome and follow the instructions on the page.

### Conditional breakpoints and logpoints

Right-click a line number:

- **Add Conditional Breakpoint...** → `item.price === undefined`. It pauses **only** when the condition is true, which is perfect for a loop over 1000 items.
- **Add Logpoint...** → `price: {item.price}`. It logs without you editing the code, so there's nothing to clean up afterwards.

---

## 5. Debugging a failing test

1. Read the failure: the test name, the expected value and the actual value.
2. Set a breakpoint inside **your** function.
3. Run the test file in the JavaScript Debug Terminal.
4. To run only the tests whose name matches a pattern:
   ```bash
   node --test --test-name-pattern="discount" week-01-types-scope/exercises/06-debugging.test.js
   ```

---

## 6. The rubber duck

Explain your code **line by line, out loud**, to a rubber duck, a colleague, or Claude. Surprisingly often you find the bug mid-sentence, at the moment you say *"...and here `price` is a number, obviously"*, and realize it isn't.

---

## 🔗 In React

- **React DevTools** (a browser extension) shows the component tree with its props and state. You'll install it in the React phase.
- Breakpoints work the same way in React code. Vite generates source maps, so you debug your original JSX, not the compiled output.
- "Cannot read properties of undefined" in React usually means **the data hasn't loaded yet on the first render**. You'll handle that with loading states.

---

## ✅ Self-check

**1. You see `TypeError: Cannot read properties of undefined (reading 'map')` on `data.items.map(...)`. What is undefined?**
<details><summary>Answer</summary>

`data.items`. The error is about the value **before** `.map`. Find out why `items` is missing: maybe the data hasn't loaded yet, the property is named differently, or the API changed.
</details>

**2. What's the difference between Step Over and Step Into?**
<details><summary>Answer</summary>

Step Over runs the current line, including any function calls on it, and stops at the next line. Step Into enters the function called on the current line.
</details>

**3. A loop runs 500 times and fails on one item. How do you pause only on that item?**
<details><summary>Answer</summary>

With a conditional breakpoint whose condition describes the bad item, like `item.price === undefined` or `i === 347`.
</details>

**4. Why is `total = total || 0` a bad fix for a total that sometimes becomes NaN?**
<details><summary>Answer</summary>

It hides the symptom. The real cause, bad data somewhere, is still there, and the total is now silently wrong.
</details>
