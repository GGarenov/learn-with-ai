// Lesson 2 — Conversion, Coercion & Equality
// Run: node week-01-types-scope/examples/02-coercion-and-equality.js
import { inspect } from 'node:util'; // turns any value into a readable label: '', -0, 0n, [] ...

console.log('--- explicit conversion (console.table is great for this) ---');
const inputs = ['42', '3.14', '  7  ', '', '   ', '12px', 'abc', null, undefined, true, []];
console.table(
  inputs.map((input) => ({
    input: inspect(input),
    'Number()': Number(input),
    'parseInt()': parseInt(input, 10),
    'Boolean()': Boolean(input),
  })),
);

console.log('\n--- truthy / falsy ---');
const candidates = [false, 0, -0, 0n, '', null, undefined, NaN, '0', 'false', ' ', [], {}, -1];
for (const value of candidates) {
  console.log(inspect(value).padEnd(10), value ? 'truthy' : 'FALSY');
}

console.log('\n--- + concatenates when a string is involved (quotes = string) ---');
console.log("'5' + 3      →", inspect('5' + 3));
console.log("1 + 2 + '3'  →", inspect(1 + 2 + '3'));
console.log("'1' + 2 + 3  →", inspect('1' + 2 + 3));
console.log("'5' - 3      →", inspect('5' - 3));
console.log("'5' * '2'    →", inspect('5' * '2'));
console.log('[] + []      →', inspect([] + []));
console.log('[1,2] + [3]  →', inspect([1, 2] + [3]));

console.log('\n--- the form input bug ---');
const inputValue = '2'; // what input.value gives you
console.log('inputValue + 1         →', inspect(inputValue + 1));
console.log('Number(inputValue) + 1 →', inspect(Number(inputValue) + 1));

console.log('\n--- == vs === ---');
const pairs = [
  ['10', 10],
  [0, ''],
  [0, '0'],
  ['', '0'],
  [false, '0'],
  [null, undefined],
  [null, 0],
  [NaN, NaN],
];
for (const [a, b] of pairs) {
  const label = `${inspect(a)} vs ${inspect(b)}`;
  console.log(label.padEnd(20), '==', String(a == b).padEnd(6), '===', a === b);
}
console.log('Object.is(NaN, NaN) →', Object.is(NaN, NaN));
console.log('Object.is(0, -0)    →', Object.is(0, -0));

console.log('\n--- || vs ?? ---');
for (const volume of [80, 0, '', null, undefined]) {
  console.log(
    `volume=${inspect(volume)}`.padEnd(18),
    '|| 50 →', inspect(volume || 50).padEnd(4),
    '?? 50 →', inspect(volume ?? 50),
  );
}

console.log('\n--- short-circuit: the right side may never run ---');
function expensive() {
  console.log('   expensive() was called');
  return 'computed';
}
console.log('true || expensive()  →', inspect(true || expensive()));
console.log('false || expensive() →', inspect(false || expensive()));
console.log("'' && expensive()    →", inspect('' && expensive()));

/*
TRY:
1. Before running, predict: true + true, [] == 0, '2' > '10', 2 > '10'. Then check.
   ('2' > '10' compares strings character by character!)
2. What does `null ?? undefined ?? 0 ?? 5` return? Why?
3. Simulate the React zero bug: const count = 0; console.log(count && 'You have messages');
*/
