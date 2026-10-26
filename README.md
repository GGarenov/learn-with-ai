# JavaScript: Junior → Mid

An 8-week, hands-on course on the JavaScript fundamentals that separate a Mid developer from a Junior — before moving on to React.

**Start:** Oct 24, 2026 · **Finish:** Dec 20, 2026 · **Time:** ~1.5–2 h on weekdays, 3–4 h on weekends

---

## How it works

Every week follows the same loop:

1. **Lesson** (`lessons/*.md`) — short theory with examples. Open it in VS Code preview: `Ctrl+Shift+V`.
2. **Examples** (`examples/*.js`) — run them, change them, break them.
3. **Exercises** (`exercises/*.js`) — write code until the tests go green.
4. **Quiz** (`quiz.md`) — predict the output, explain concepts, review someone's code, write code. Closed book.
5. **Review** — Claude checks your exercises and quiz like a senior developer in a code review.

### A weekday (~1.5–2 h)

| Time | What |
|---|---|
| 15 min | Re-read **Weak spots** in [PROGRESS.md](PROGRESS.md) |
| 30–45 min | Today's lesson + examples |
| 45–60 min | Today's exercise |

Weekends: the bigger tasks (debugging, projects), the weekly quiz, and the review.

---

## Running the tests

```bash
# Re-run one exercise on every save (recommended way to work)
node --test --watch week-01-types-scope/exercises/01-values-and-types.test.js

# Run one exercise once
node --test week-01-types-scope/exercises/01-values-and-types.test.js

# Run everything for a week
npm run test:w1
```

**Red is normal.** Every exercise starts red. Your job is to turn it green.

Run an example:

```bash
node week-01-types-scope/examples/01-values-and-types.js
```

---

## Rules

1. **Predict before you run.** When a task says "predict", write your answer *first*. Being wrong is where the learning happens — but only if you committed to an answer.
2. **Ask for hints, not solutions.** Stuck for 15 min? Open the week's `HINTS.md`. Still stuck? Ask Claude for a hint. Never ask for the solution — you'd learn nothing.
3. **"I don't know" is a valid answer** in quizzes. Guessing and hiding it makes the review useless.
4. **Don't edit `*.test.js` files** or anything in `tools/`. The tests are the spec.
5. **Write down every mistake** in [PROGRESS.md](PROGRESS.md) → Weak spots. That list is your daily review.
6. **Commit every day:** `git add . && git commit -m "week 1 day 2"`

---

## Working with Claude

Write in Bulgarian or English — either works.

| You want | Say something like |
|---|---|
| A code review of an exercise | "Review week 1, exercise 03" |
| A hint | "Hint for 02-coercion, task 3" |
| Your quiz graded | "Check my week 1 quiz" |
| A different explanation | "Explain hoisting differently" / "Give me 3 more exercises on scope" |
| The diagnostic graded | "Check my diagnostic" |
| The next week | "I'm ready for week 2" |

Weeks 2–8 are generated one at a time, adapted to your quiz results and weak spots.

---

## Roadmap

| Week | Dates | Topic | Status |
|---|---|---|---|
| 0 | Oct 24–25 | [Setup & diagnostic](week-00-diagnostic/README.md) | ✅ ready |
| 1 | Oct 26 – Nov 1 | [Types, coercion, references, scope, hoisting, debugging](week-01-types-scope/README.md) | ✅ ready |
| 2 | Nov 2–8 | Execution context, `this`, closures, higher-order functions, `call`/`apply`/`bind` | ⏳ |
| 3 | Nov 9–15 | Destructuring, spread/rest, `?.`, `??`, Map/Set, strings, immutability | ⏳ |
| 4 | Nov 16–22 | Arrays in depth, `reduce`, immutable array methods · 🛠 Mini-project 1 | ⏳ |
| 5 | Nov 23–29 | DOM, events, delegation, forms, localStorage, timers · 🛠 Mini-project 2 (state → render) | ⏳ |
| 6 | Nov 30 – Dec 6 | Prototypes, classes, modules, npm, Vite, error handling | ⏳ |
| 7 | Dec 7–13 | Event loop, promises, async/await, fetch, `AbortController` | ⏳ |
| 8 | Dec 14–20 | Functional principles · 🛠 Final project · Final exam · Mock Mid interview | ⏳ |

---

## Folder structure

```
learn_with_ai/
├── README.md            ← you are here
├── PROGRESS.md          ← checklist, scores, weak spots
├── tools/               ← test helpers (don't edit)
├── week-00-diagnostic/
├── week-01-types-scope/
│   ├── README.md        ← the week's plan, day by day
│   ├── lessons/         ← theory
│   ├── examples/        ← runnable demos
│   ├── exercises/       ← tasks + tests
│   ├── HINTS.md         ← hints, level by level
│   └── quiz.md          ← end-of-week quiz
└── ...
```
