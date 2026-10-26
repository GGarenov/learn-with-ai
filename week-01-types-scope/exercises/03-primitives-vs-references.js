/**
 * Exercise 3 — Primitives vs References  ⭐ the most important one for React
 * Lesson: lessons/03-primitives-vs-references.md
 * Run:    node --test --watch week-01-types-scope/exercises/03-primitives-vs-references.test.js
 *
 * The golden rule for every task here: NEVER mutate the inputs.
 * Return new objects/arrays instead. The tests check this.
 */

/**
 * Task 1 — updateName
 * Return a new user with the new name. Keep all other properties.
 *
 * updateName({ name: 'Ana', age: 25 }, 'Maria') → { name: 'Maria', age: 25 }
 */
export function updateName(user, newName) {
  // your code
}

/**
 * Task 2 — addItem
 * A cart looks like: { items: [{ name, price }, ...], total }
 * Return a new cart with the item added at the end and the total increased by its price.
 * Neither the cart nor its items array may change.
 *
 * addItem({ items: [{ name: 'Pen', price: 2 }], total: 2 }, { name: 'Book', price: 12.5 })
 *   → { items: [{ name: 'Pen', price: 2 }, { name: 'Book', price: 12.5 }], total: 14.5 }
 */
export function addItem(cart, item) {
  // your code
}

/**
 * Task 3 — updateCity
 * user = { name, address: { city, street }, settings: { theme } }
 * Return a new user whose address.city is `city`.
 *
 * ⚠️ Don't deep-clone the whole user. Copy only what's on the path that changes.
 *    Parts that didn't change (like `settings`) must stay the SAME objects
 *    (structural sharing — this is exactly how React state updates work).
 */
export function updateCity(user, city) {
  // your code
}

/**
 * Task 4 — toggleTodo
 * todos = [{ id, text, done }, ...]
 * Return a new array where the todo with the given id has `done` flipped.
 * - The original array and the original todo objects must not change.
 * - Todos that didn't change must be the SAME objects as before.
 * - If no todo has that id, return a copy with the same todos.
 */
export function toggleTodo(todos, id) {
  // your code
}

/**
 * Task 5 — removeAt
 * Return a new array without the item at `index`.
 * If the index is out of range (negative or >= length), return a copy of the array.
 *
 * removeAt(['a', 'b', 'c'], 1) → ['a', 'c']
 * removeAt(['a', 'b'], 5)      → ['a', 'b']   (a new array)
 */
export function removeAt(array, index) {
  // your code
}

/**
 * ⭐ Task 6 — isShallowEqual
 * Compare two objects ONE level deep:
 * - same number of own keys, and
 * - for every key, the values are identical (=== , or Object.is to handle NaN)
 * This is exactly what React.memo does to decide whether props changed.
 *
 * isShallowEqual({ a: 1, b: 'x' }, { a: 1, b: 'x' })   → true
 * isShallowEqual({ a: { n: 1 } }, { a: { n: 1 } })     → false  (two different inner objects)
 */
export function isShallowEqual(a, b) {
  // your code
}

/**
 * ⭐ Task 7 — deepClone
 * Write your own deep clone for primitives, arrays and plain objects (nested at any depth).
 * Without structuredClone and without JSON (the test checks!).
 *
 * Hint: a function that calls itself (recursion) for every nested array/object.
 */
export function deepClone(value) {
  // your code
}
