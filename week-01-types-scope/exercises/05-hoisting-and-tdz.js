/**
 * Exercise 5 — Hoisting & the TDZ
 * Lesson: lessons/05-hoisting-and-tdz.md
 * Run:    node --test --watch week-01-types-scope/exercises/05-hoisting-and-tdz.test.js
 */

/* =====================================================================================
 * PART 1 — PREDICT
 *
 * Predict what each snippet (h1 … h12) RETURNS.
 * If it throws, write the error name: 'ReferenceError' or 'TypeError'.
 * For the value undefined, write undefined (no quotes). For the STRING 'undefined', use quotes.
 * ===================================================================================== */

export function h1() {
  const result = greet();
  function greet() {
    return 'hi';
  }
  return result;
}

export function h2() {
  const result = city;
  var city = 'Sofia';
  return result;
}

export function h3() {
  const result = country;
  let country = 'BG';
  return result;
}

export function h4() {
  const result = sayHi();
  var sayHi = function () {
    return 'hi';
  };
  return result;
}

export function h5() {
  const result = add(1, 2);
  const add = (a, b) => a + b;
  return result;
}

export function h6() {
  function getAnswer() {
    return answer;
  }
  const answer = 42;
  return getAnswer();
}

export function h7() {
  const level = 'outer';
  function read() {
    const result = level;
    const level = 'inner';
    return result;
  }
  return read();
}

export function h8() {
  return typeof neverDeclared;
}

export function h9() {
  const result = typeof score;
  let score = 10;
  return result;
}

export function h10() {
  const result = new Car('BMW').brand;
  class Car {
    constructor(brand) {
      this.brand = brand;
    }
  }
  return result;
}

export function h11() {
  var count = 1;
  if (true) {
    var count = 2;
  }
  return count;
}

export function h12() {
  return typeof later;
  function later() {}
}

export const predictions = {
  h1: '?',
  h2: '?',
  h3: '?',
  h4: '?',
  h5: '?',
  h6: '?',
  h7: '?',
  h8: '?',
  h9: '?',
  h10: '?',
  h11: '?',
  h12: '?',
};

/* =====================================================================================
 * PART 2 — FIX THE BUGS
 *
 * Same process as yesterday: read the error → explain it in one sentence → fix it →
 * leave a // BUG: comment.
 * ===================================================================================== */

/**
 * Fix 1 — buildGreeting
 * buildGreeting('  Ana ') → 'Hello, Ana!'
 */
export function buildGreeting(name) {
  const greeting = format(name);
  const format = (value) => `Hello, ${value.trim()}!`;
  return greeting;
}

/**
 * Fix 2 — processOrder
 * Returns { status, total }:
 *   - no items  → { status: 'empty', total: 0 }
 *   - otherwise → { status: 'ok', total: sum of price * quantity }
 */
export function processOrder(order) {
  if (order.items.length === 0) {
    return { status: 'empty', total };
  }
  let total = 0;
  for (const item of order.items) {
    total += item.price * item.quantity;
  }
  return { status: 'ok', total };
}

/**
 * Fix 3 — calculateTotal
 * calculateTotal([{ price: 10 }, { price: 5 }]) → 15
 */
export function calculateTotal(items) {
  let total = 0;
  for (const item of items) {
    let total = total + item.price;
  }
  return total;
}

/**
 * Fix 4 — findFirstNegative
 * Returns the first negative number in the array, or null if there isn't one.
 *
 * This one "works"... sort of. Rewrite it WITHOUT `var` (the test checks!)
 * and make it return null instead of undefined when there's no negative number.
 */
export function findFirstNegative(numbers) {
  for (var i = 0; i < numbers.length; i++) {
    if (numbers[i] < 0) {
      var found = numbers[i];
      break;
    }
  }
  return found;
}
