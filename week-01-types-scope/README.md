# Week 1 — Types, Coercion, References, Scope & Hoisting

**Dates:** Oct 26 – Nov 1

This week is about the foundations everything else stands on. They look basic, but most "weird" JavaScript bugs — and many interview questions — come from exactly these topics. Lesson 3 is the most important one for React.

## By the end of this week you can

- name the 8 JavaScript types and check any of them reliably
- predict what `==`, `+` and `||` do with mixed types
- explain why `{} === {}` is `false` and update nested objects without mutating them
- explain lexical scope, shadowing, hoisting and the TDZ
- read a stack trace and step through code with a debugger instead of guessing

## Schedule

| Day | Lesson | Exercise |
|---|---|---|
| Mon | [01 — Values & types](lessons/01-values-and-types.md) | `01-values-and-types` |
| Tue | [02 — Coercion & equality](lessons/02-coercion-and-equality.md) | `02-coercion-and-equality` |
| Wed | [03 — Primitives vs references](lessons/03-primitives-vs-references.md) ⭐ | `03-primitives-vs-references` |
| Thu | [04 — Scope](lessons/04-scope.md) | `04-scope` |
| Fri | [05 — Hoisting & the TDZ](lessons/05-hoisting-and-tdz.md) | `05-hoisting-and-tdz` |
| Sat | [06 — Debugging](lessons/06-debugging.md) | `06-debugging` (bug hunt 🐛) |
| Sun | [Quiz](quiz.md) + review with Claude | |

## Checklist

- [ ] Mon — lesson 01 + exercise 01
- [ ] Tue — lesson 02 + exercise 02
- [ ] Wed — lesson 03 + exercise 03
- [ ] Thu — lesson 04 + exercise 04
- [ ] Fri — lesson 05 + exercise 05
- [ ] Sat — lesson 06 + exercise 06
- [ ] Sun — quiz, then "Check my week 1 quiz"

## Every day

1. **15 min** — re-read Weak spots in [PROGRESS.md](../PROGRESS.md).
2. **Lesson** — open it and press `Ctrl+Shift+V` for the preview. Do the ✅ Self-check at the end *before* opening the answers.
3. **Example** — run it, read the output, then do the `TRY` tasks at the bottom of the file:
   ```bash
   node week-01-types-scope/examples/01-values-and-types.js
   ```
4. **Exercise** — open the exercise file on one side and the test runner on the other:
   ```bash
   node --test --watch week-01-types-scope/exercises/01-values-and-types.test.js
   ```
   - Exercises with a **Part 1 — Predict** section: fill in *all* predictions before you run the tests.
   - Tasks marked ⭐ are bonus.
   - Stuck for 15 min → [HINTS.md](HINTS.md). Still stuck → ask Claude for a hint.
5. **Review** — "Review week 1, exercise 01". Tests passing doesn't mean the code is good; the review covers the rest.
6. **Commit** — `git add . && git commit -m "week 1 day 1"`
