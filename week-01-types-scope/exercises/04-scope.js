/**
 * Exercise 4 — Scope
 * Lesson: lessons/04-scope.md
 * Run:    node --test --watch week-01-types-scope/exercises/04-scope.test.js
 */

/* =====================================================================================
 * PART 1 — PREDICT
 *
 * Read each snippet (s1 … s10) and predict what it RETURNS.
 * If it throws, write the error name as a string: 'ReferenceError' or 'TypeError'.
 * Fill in the `predictions` object at the end of Part 1. Don't edit the snippets.
 * ===================================================================================== */

export function s1() {
  let x = 'outer';
  function inner() {
    return x;
  }
  return inner();
}

export function s2() {
  let x = 'outer';
  function inner() {
    let x = 'inner';
    return x;
  }
  inner();
  return x;
}

export function s3() {
  if (true) {
    var a = 'var';
    let b = 'let';
  }
  return typeof a + ' ' + typeof b;
}

export function s4() {
  const name = 'Ana';
  function greet() {
    return `Hi ${name}`;
  }
  function run() {
    const name = 'Ivan';
    return greet();
  }
  return run();
}

export function s5() {
  let count = 0;
  function increment() {
    count = count + 1;
  }
  increment();
  increment();
  return count;
}

export function s6() {
  let count = 0;
  function increment(count) {
    count = count + 1;
    return count;
  }
  increment(count);
  increment(count);
  return count;
}

export function s7() {
  for (let i = 0; i < 3; i++) {
    // nothing
  }
  return typeof i;
}

export function s8() {
  function outer() {
    const secret = 42;
    return function inner() {
      return secret;
    };
  }
  return outer()();
}

export function s9() {
  const x = 1;
  {
    const x = 2;
  }
  return x;
}

export function s10() {
  function setup() {
    const config = { debug: true };
  }
  setup();
  return config.debug;
}

export const predictions = {
  s1: '?',
  s2: '?',
  s3: '?',
  s4: '?',
  s5: '?',
  s6: '?',
  s7: '?',
  s8: '?',
  s9: '?',
  s10: '?',
};

/* =====================================================================================
 * PART 2 — FIX THE BUGS
 *
 * Each function below has ONE scope-related bug. The tests describe the correct behavior.
 * 1. Run the tests and read the error message first.
 * 2. Explain the bug to yourself in one sentence — then fix it.
 * 3. Above the fix, write a comment: // BUG: <what was wrong and why>
 * ===================================================================================== */

/**
 * Bug 1 — createCallbacks
 * Should return 3 functions; calling them should return 0, 1 and 2.
 */
export function createCallbacks() {
  const callbacks = [];
  for (var i = 0; i < 3; i++) {
    callbacks.push(function () {
      return i;
    });
  }
  return callbacks;
}

/**
 * Bug 2 — getDiscount
 * Premium users get 0.2 (20%), everyone else 0.
 */
export function getDiscount(user) {
  if (user.isPremium) {
    const discount = 0.2;
  } else {
    const discount = 0;
  }
  return discount;
}

/**
 * Bug 3 — countWords
 * Counts the words in a text. Words are separated by one or more spaces.
 */
export function countWords(text) {
  count = 0;
  for (const word of text.split(' ')) {
    if (word !== '') {
      count++;
    }
  }
  return count;
}

/**
 * Bug 4 — login / logout / getCurrentUser
 * login(name) should store { name } as the current user and return it.
 * (Only one of these three functions has the bug.)
 */
let currentUser = null;

export function login(name) {
  let currentUser = { name };
  return currentUser;
}

export function logout() {
  currentUser = null;
}

export function getCurrentUser() {
  return currentUser;
}
