/**
 * Exercise 2 — Conversion, Coercion & Equality
 * Lesson: lessons/02-coercion-and-equality.md
 * Run:    node --test --watch week-01-types-scope/exercises/02-coercion-and-equality.test.js
 */

/* =====================================================================================
 * PART 1 — PREDICT
 *
 * Replace each '?' with the EXACT value the expression produces — with the right type:
 *   '53' (a string) is not the same as 53 (a number).
 *   Write NaN as NaN, booleans as true/false (not 'true').
 *
 * Fill in ALL predictions first, without running anything. Then run the tests.
 * Got one wrong? Don't just copy the right answer — figure out WHY, then add it to
 * PROGRESS.md → Weak spots.
 * ===================================================================================== */

export const predictions = {
  q1: '?', //  '5' + 3
  q2: '?', //  '5' - 3
  q3: '?', //  '5' * '2'
  q4: '?', //  true + 1
  q5: '?', //  1 + 2 + '3'
  q6: '?', //  '1' + 2 + 3
  q7: '?', //  [] + []
  q8: '?', //  [1, 2] + [3]
  q9: '?', //  null + 1
  q10: '?', // undefined + 1
  q11: '?', // '10' == 10
  q12: '?', // 0 == ''
  q13: '?', // null == undefined
  q14: '?', // null === undefined
  q15: '?', // null == 0
  q16: '?', // NaN === NaN
  q17: '?', // Boolean('0')
  q18: '?', // Boolean('')
  q19: '?', // !!'false'
  q20: '?', // Boolean([])
  q21: '?', // 0 || 'default'
  q22: '?', // 0 ?? 'default'
  q23: '?', // '' && 'hello'
  q24: '?', // 'a' && 'b'
  q25: '?', // Number('')
  q26: '?', // Number('12px')
  q27: '?', // parseInt('12px', 10)
  q28: '?', // typeof NaN
  q29: '?', // 0.1 + 0.2 === 0.3
  q30: '?', // Object.is(NaN, NaN)
};

/* =====================================================================================
 * PART 2 — CODE
 * ===================================================================================== */

/**
 * Task 1 — toNumber
 * Safely convert user input to a number. Return null if it isn't a clean number.
 *   - numbers: return them as they are, but NaN / Infinity → null
 *   - strings: trim them; empty → null; otherwise a valid number → that number, else null
 *   - anything else (null, undefined, booleans, arrays...) → null
 *
 * toNumber(42)        → 42
 * toNumber(' 3.14 ')  → 3.14
 * toNumber('')        → null   (careful: Number('') is 0!)
 * toNumber('12px')    → null
 * toNumber(null)      → null   (careful: Number(null) is 0!)
 * toNumber(true)      → null   (careful: Number(true) is 1!)
 */
export function toNumber(value) {
  // your code
}

/**
 * Task 2 — compact
 * Return a NEW array without the falsy values. Don't mutate the input.
 *
 * compact([0, 1, false, 2, '', 3, null]) → [1, 2, 3]
 * compact(['0', [], {}])                 → ['0', [], {}]   (all truthy!)
 */
export function compact(array) {
  // your code
}

/**
 * Task 3 — withDefault
 * Return defaultValue ONLY when value is null or undefined.
 * 0, '', false and NaN are real values and must be kept.
 *
 * withDefault(undefined, 10) → 10
 * withDefault(0, 10)         → 0
 * withDefault('', 'none')    → ''
 */
export function withDefault(value, defaultValue) {
  // your code
}

/**
 * Task 4 — sumInputs
 * You get the raw values of several <input> fields — always strings.
 * Return their sum as a number. Skip empty and invalid inputs. Reuse toNumber!
 *
 * sumInputs(['10', '5', '2.5'])                  → 17.5
 * sumInputs(['10', '', 'abc', ' 5 ', '12px'])    → 15
 * sumInputs([])                                  → 0
 */
export function sumInputs(values) {
  // your code
}

/**
 * ⭐ Task 5 — isSameValue
 * Re-implement Object.is(a, b) WITHOUT using Object.is.
 * It works like === except:
 *   isSameValue(NaN, NaN) → true   (=== says false)
 *   isSameValue(0, -0)    → false  (=== says true)
 *
 * Hint for -0: what's 1 / 0? And 1 / -0?
 */
export function isSameValue(a, b) {
  // your code
}
