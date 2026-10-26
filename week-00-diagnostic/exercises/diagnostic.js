/**
 * WEEK 0 — DIAGNOSTIC CODING TASKS
 *
 * Run: node --test --watch week-00-diagnostic/exercises/diagnostic.test.js
 *
 * - MDN is allowed. AI is not.
 * - Stuck for more than 15 minutes? Leave a `// stuck: <why>` comment and move on.
 * - Tasks get harder as you go. It's completely fine not to finish them all.
 */

/**
 * Task 1 — Sum of even numbers
 * Return the sum of all even numbers in the array.
 *
 * sumEven([1, 2, 3, 4]) → 6
 * sumEven([])           → 0
 */
export function sumEven(numbers) {
  let sum = 0;

  for (let number of numbers) {
    if (number % 2 === 0) {
      sum += number;
    }
  }

  return sum;
}

/**
 * Task 2 — Capitalize words
 * Make the first letter of every word uppercase and the rest lowercase.
 * Words are separated by single spaces.
 *
 * capitalizeWords('hello world')       → 'Hello World'
 * capitalizeWords('jAVAsCRIPT is FUN') → 'Javascript Is Fun'
 * capitalizeWords('')                  → ''
 */
export function capitalizeWords(text) {
  return text.toUppercase();
}

/**
 * Task 3 — Count occurrences
 * Return an object that says how many times each value appears.
 *
 * countOccurrences(['a', 'b', 'a', 'c', 'a']) → { a: 3, b: 1, c: 1 }
 * countOccurrences([])                        → {}
 */
export function countOccurrences(items) {
  // your code
}

/**
 * Task 4 — Active user names
 * Return the names of the active users, sorted alphabetically.
 * The input array must NOT be changed.
 *
 * getActiveUserNames([
 *   { name: 'Ivan', active: true },
 *   { name: 'Petar', active: false },
 *   { name: 'Ana', active: true },
 * ]) → ['Ana', 'Ivan']
 */
export function getActiveUserNames(users) {
  // your code
}

/**
 * Task 5 — Immutable update
 * Return a NEW user with the changes applied.
 * If `changes` contains `address`, MERGE it with the existing address (don't replace it).
 * The original user must NOT change.
 *
 * const user = { name: 'Ana', age: 25, address: { city: 'Sofia', zip: '1000' } };
 * updateUser(user, { age: 26, address: { city: 'Plovdiv' } })
 *   → { name: 'Ana', age: 26, address: { city: 'Plovdiv', zip: '1000' } }
 */
export function updateUser(user, changes) {
  // your code
}

/**
 * Task 6 — Counter
 * createCounter(start = 0) returns an object with 4 methods:
 *   increment(), decrement(), reset() — back to the start value, getValue()
 * - Every counter is independent of the others.
 * - The current value must be private: the only way to read it is getValue().
 *
 * const counter = createCounter(5);
 * counter.increment();
 * counter.getValue(); → 6
 * counter.reset();
 * counter.getValue(); → 5
 */
export function createCounter(start = 0) {
  // your code
}

/**
 * Task 7 — once
 * Return a new function that calls `fn` only the FIRST time it's called.
 * Every later call returns the result of the first call, without calling `fn` again.
 * Arguments must be passed through to `fn`.
 *
 * const init = once(() => { console.log('init!'); return 'ready'; });
 * init(); → logs 'init!', returns 'ready'
 * init(); → returns 'ready' (no log)
 */
export function once(fn) {
  // your code
}

/**
 * Task 8 — Load user names (async)
 * `fetchUser(id)` returns a Promise that resolves to { id, name }.
 * Return a Promise that resolves to an array of names, in the SAME ORDER as `ids`.
 * - All requests must run IN PARALLEL, not one after another.
 * - If any request fails, the returned Promise must reject.
 *
 * await loadUserNames([1, 2], fetchUser) → ['Ana', 'Ivan']
 */
export async function loadUserNames(ids, fetchUser) {
  // your code
}
