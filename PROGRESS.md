# Progress

## Weeks

| Week | Topic | Exercises | Quiz | Done |
|---|---|---|---|---|
| 0 | Setup & diagnostic | – | – | ☐ |
| 1 | Types, coercion, references, scope, hoisting, debugging | 0 / 6 | – | ☐ |
| 2 | Execution context, `this`, closures, HOFs | – | – | ☐ |
| 3 | Modern syntax, Map/Set, immutability | – | – | ☐ |
| 4 | Arrays · Mini-project 1 | – | – | ☐ |
| 5 | DOM & events · Mini-project 2 | – | – | ☐ |
| 6 | OOP, modules, tooling | – | – | ☐ |
| 7 | Async JavaScript | – | – | ☐ |
| 8 | Functional JS · Final project · Final exam | – | – | ☐ |

---

## Weak spots — review these every day

Add anything you got wrong: a prediction, a quiz question, a concept that felt shaky.
Write it as a question + the short answer. Delete it once you can explain it to someone else without looking.

<!-- Example:
- Why is `typeof null` 'object'? → A 1995 bug that can't be fixed. Check with `x === null`.
-->

- What does `typeof` return? → Always a **string**: `typeof null` → 'object', `typeof []` → 'object', `typeof NaN` → 'number'.
- The 8 falsy values? → `false 0 -0 0n '' null undefined NaN`. `'0'`, `'false'`, `[]`, `{}` are truthy.
- `call` vs `apply`? → `fn.call(thisArg, a, b)` vs `fn.apply(thisArg, [a, b])`. `bind` returns a new function.
- Does `toSorted()` fix `[10, 1, 2].sort()`? → No, both compare as strings. Pass `(a, b) => a - b`.

---

## Diagnostic results

**Questions (Oct 25):** ~13.5 / 28 (≈ 48%) · **Coding tasks:** not done yet

| Area | Score | Notes |
|---|---|---|
| Types & coercion | 2.25 / 4 | `typeof` returns a **string** ('object', 'number'...), not true/false. Missed `''` as falsy. `'0'` and `'false'` are truthy. |
| Scope & hoisting | 2.5 / 3 | Solid. Missing: *why* `var` gives 3 3 3 (→ closures, week 2). The term is **Temporal** Dead Zone. |
| References & copying | 2 / 3 | Good mental model. Missed the React consequence (3.3): mutation + same reference = no re-render. |
| Functions, `this`, closures | 2.75 / 4 | Closure definition OK, no practical example. `call` vs `apply`: separate args vs **array** (not array vs object). `greet()` → TypeError. |
| Modern syntax & arrays | 3.75 / 4 | Strong. But `toSorted()` without a comparator also sorts as strings → `(a, b) => a - b`. |
| DOM & events | 0.25 / 3 | Doesn't know event delegation, `target` vs `currentTarget`, `stopPropagation`. |
| OOP & modules | 0 / 3 | Starting from zero. |
| Async | 0 / 4 | Starting from zero. |

**Self-assessment vs reality:** rated types 5/5 but missed basics there → overconfidence on "easy" topics. Rated arrays 5/5 → mostly justified.

**Plan changes:**
- Week 1 stays as is — it targets exactly the gaps above.
- Week 3 (modern syntax) gets shortened — you're already strong there; the freed days go to week 7 (async).
- Weeks 5, 6, 7 assume zero prior knowledge.

---

## Quiz log

| Week | Score | Main feedback |
|---|---|---|
| 1 | | |

---

## Notes

Anything you want to remember: aha moments, questions for later, things from work.
