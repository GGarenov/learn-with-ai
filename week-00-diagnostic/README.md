# Week 0 — Setup & Diagnostic

**When:** this weekend (Oct 24–25) · **Time:** ~3 hours in total

This week isn't about learning. It's about finding out what you **already know**, so we skip it, and what you **don't**, so we spend more time there. Nobody is expected to answer everything — a diagnostic where you know it all would be useless.

---

## Part 1 — Setup (15 min)

- [ ] Open the `learn_with_ai` folder in VS Code
- [ ] Check Node: `node -v` → anything v20+ works (you have v24 ✓)
- [ ] Create a git repo and make the first commit:
  ```bash
  git init
  git add .
  git commit -m "Start JS course"
  ```
- [ ] Run the diagnostic tests once, just to see what "red" looks like:
  ```bash
  npm run test:w0
  ```
- [ ] Open [the root README](../README.md) and read **How it works** and **Rules**

Nothing else to install. Everything runs on plain Node.

---

## Part 2 — Questions (~75 min) → [diagnostic.md](diagnostic.md)

- **Closed book:** no Google, no AI, no running the code.
- "I don't know" is a perfect answer. If you guess, write `(guess)` next to it — that matters for the review.
- Max ~3 minutes per question. Don't get stuck.

---

## Part 3 — Coding tasks (~60–90 min) → [exercises/diagnostic.js](exercises/diagnostic.js)

- 8 tasks, from easy to hard.
- **MDN is allowed** (that's how real work looks). AI is not.
- Work in watch mode — tests re-run every time you save:
  ```bash
  node --test --watch week-00-diagnostic/exercises/diagnostic.test.js
  ```
- Stuck for 15 minutes on a task? Write `// stuck: <what's unclear>` in the function and move on.

---

## Part 4 — Send it for review

Commit your work, then tell Claude: **"Check my diagnostic"**.

Claude will read both files, run the tests, fill in **Diagnostic results** in [PROGRESS.md](../PROGRESS.md), and tell you what to go faster on, what to slow down on, and whether the plan for weeks 2–8 needs changes.
