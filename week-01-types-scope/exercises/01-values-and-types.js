/**
 * Exercise 1 — Values and Types
 * Lesson: lessons/01-values-and-types.md
 * Run:    node --test --watch week-01-types-scope/exercises/01-values-and-types.test.js
 *
 * Replace every `// your code` with an implementation until all tests pass.
 * ⭐ = bonus task.
 */

/**
 * Task 1 — getType
 * Works like `typeof`, but fixes its three lies:
 *   null   → 'null'
 *   arrays → 'array'
 *   NaN    → 'nan'
 * For everything else, return what `typeof` returns.
 *
 * getType('hi')     → 'string'
 * getType(null)     → 'null'
 * getType([1, 2])   → 'array'
 * getType(NaN)      → 'nan'
 * getType(() => {}) → 'function'
 */
export function getType(value) {
  // your code
}

/**
 * Task 2 — isValidNumber
 * true only for real, usable numbers: of type number, not NaN, not Infinity / -Infinity.
 * Strings are NOT numbers here, not even '42'.
 *
 * isValidNumber(42)       → true
 * isValidNumber(-0.5)     → true
 * isValidNumber(NaN)      → false
 * isValidNumber(Infinity) → false
 * isValidNumber('42')     → false
 */
export function isValidNumber(value) {
  // your code
}

/**
 * Task 3 — formatPrice
 * Format an amount with exactly 2 decimals, followed by a space and a currency code.
 * The currency defaults to 'EUR'.
 * If the amount is not a valid number (reuse Task 2!), return 'Invalid price'.
 *
 * formatPrice(12.5)       → '12.50 EUR'
 * formatPrice(3, 'USD')   → '3.00 USD'
 * formatPrice(0)          → '0.00 EUR'
 * formatPrice('12')       → 'Invalid price'
 */
export function formatPrice(amount, currency) {
  // your code
}

/**
 * Task 4 — addMoney
 * Add two amounts and return the sum rounded to 2 decimals — as a NUMBER, not a string.
 *
 * addMoney(0.1, 0.2)    → 0.3     (not 0.30000000000000004)
 * addMoney(19.99, 5.01) → 25
 * addMoney(10, 2.5)     → 12.5
 */
export function addMoney(a, b) {
  // your code
}

/**
 * Task 5 — isEmpty
 * Return true if the value is "empty":
 *   - null or undefined
 *   - a string with no characters, or only whitespace: '', '   '
 *   - an array with no items: []
 *   - a plain object with no own keys: {}
 * Everything else is NOT empty — including 0, false and NaN!
 *
 * isEmpty('  ')   → true
 * isEmpty({})     → true
 * isEmpty(0)      → false
 * isEmpty([0])    → false
 */
export function isEmpty(value) {
  // your code
}

/**
 * ⭐ Task 6 — countTypes
 * Count how many values of each type (as returned by YOUR getType) are in the array.
 *
 * countTypes([1, 'a', null, 2, [], NaN]) → { number: 2, string: 1, null: 1, array: 1, nan: 1 }
 * countTypes([])                         → {}
 */
export function countTypes(values) {
  // your code
}
