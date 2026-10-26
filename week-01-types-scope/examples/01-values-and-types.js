// Lesson 1 — Values and Types
// Run: node week-01-types-scope/examples/01-values-and-types.js
// Read the output top to bottom, then do the TRY tasks at the end of the file.

console.log('--- typeof for every type ---');
const values = ['hello', 42, 10n, true, undefined, null, Symbol('id'), {}, [], () => {}, NaN];
for (const value of values) {
  console.log(value, '→', typeof value);
}

console.log('\n--- reliable checks ---');
const maybeNull = null;
const list = [1, 2, 3];
console.log('maybeNull === null      →', maybeNull === null);
console.log('Array.isArray(list)     →', Array.isArray(list));
console.log('Number.isNaN(NaN)       →', Number.isNaN(NaN));
console.log('Number.isNaN("hello")   →', Number.isNaN('hello'));
console.log('isNaN("hello") (old)    →', isNaN('hello'), '← converts first, avoid');
console.log('Number.isFinite(42)     →', Number.isFinite(42));
console.log('Number.isFinite("42")   →', Number.isFinite('42'));

console.log('\n--- floating point ---');
console.log('0.1 + 0.2               →', 0.1 + 0.2);
console.log('0.1 + 0.2 === 0.3       →', 0.1 + 0.2 === 0.3);
console.log('(0.1 + 0.2).toFixed(2)  →', (0.1 + 0.2).toFixed(2), typeof (0.1 + 0.2).toFixed(2));
console.log('Math.round(x*100)/100   →', Math.round((0.1 + 0.2) * 100) / 100);

// Money in cents: no surprises
const priceInCents = 1999;
const quantity = 3;
const totalInCents = priceInCents * quantity;
console.log('total                   →', (totalInCents / 100).toFixed(2), 'EUR');

console.log('\n--- NaN spreads ---');
const prices = [10, 20, undefined, 5];
let sum = 0;
for (const price of prices) {
  sum += price;
}
console.log('sum with one undefined  →', sum);

console.log('\n--- undefined vs null ---');
let notAssigned;
const user = { name: 'Ana' };
function noReturn() {}
console.log('declared, not assigned  →', notAssigned);
console.log('missing property        →', user.email);
console.log('function without return →', noReturn());
const selected = null; // empty on purpose
console.log('set to null on purpose  →', selected);

console.log('\n--- const does not freeze objects ---');
const settings = { theme: 'light' };
settings.theme = 'dark';
console.log('settings after change   →', settings);
try {
  // eslint-disable-next-line no-const-assign
  settings = {};
} catch (error) {
  console.log('reassigning a const     →', `${error.name}: ${error.message}`);
}

console.log('\n--- template literals ---');
const name = 'Ana';
for (const count of [0, 1, 5]) {
  console.log(`${name} has ${count} item${count === 1 ? '' : 's'}`);
}

/*
TRY (change the code above or write below, then re-run):
1. Add `new Date()` and `new Map()` to the `values` array. What does typeof say? Why?
2. Change `undefined` in `prices` to the string '15'. What's the sum now? (You'll understand
   it fully in lesson 2.)
3. Calculate 19.99 * 3 directly and print it. Compare with the cents version.
4. Print Number.MAX_SAFE_INTEGER + 1 and Number.MAX_SAFE_INTEGER + 2. Notice anything?
*/
