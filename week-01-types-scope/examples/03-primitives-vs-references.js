// Lesson 3 — Primitives vs References
// Run: node week-01-types-scope/examples/03-primitives-vs-references.js

console.log('--- primitives are copied ---');
let a = 10;
let b = a;
b = 20;
console.log({ a, b });

console.log('\n--- objects are shared by reference ---');
const user1 = { name: 'Ana' };
const user2 = user1;
user2.name = 'Ivan';
console.log({ user1, user2, same: user1 === user2 });

console.log('\n--- equality compares references ---');
console.log('{} === {}          →', {} === {});
console.log('[1] === [1]        →', [1] === [1]);
const ref = { x: 1 };
console.log('ref === ref        →', ref === ref);

console.log('\n--- functions can mutate what you pass in ---');
function addBonus(employee) {
  employee.salary += 100; // side effect!
}
const employee = { name: 'Maria', salary: 1000 };
addBonus(employee);
console.log('after addBonus     →', employee);

function withBonus(employee) {
  return { ...employee, salary: employee.salary + 100 }; // no side effect
}
const original = { name: 'Petar', salary: 1000 };
const promoted = withBonus(original);
console.log('original           →', original);
console.log('promoted           →', promoted);

console.log('\n--- shallow copy shares nested objects ---');
const person = { name: 'Ana', address: { city: 'Sofia' } };
const shallow = { ...person };
shallow.name = 'Ivan';
shallow.address.city = 'Varna';
console.log('person             →', person, '← city changed too!');
console.log('same address?      →', person.address === shallow.address);

console.log('\n--- deep copy with structuredClone ---');
const person2 = { name: 'Ana', address: { city: 'Sofia' }, born: new Date(1999, 0, 1) };
const deep = structuredClone(person2);
deep.address.city = 'Burgas';
console.log('person2.address    →', person2.address);
console.log('deep.address       →', deep.address);
console.log('Date still a Date? →', deep.born instanceof Date);

console.log('\n--- immutable updates + structural sharing ---');
const state = {
  user: { name: 'Ana', address: { city: 'Sofia', street: 'Vitosha 1' } },
  settings: { theme: 'dark' },
};
const next = {
  ...state,
  user: {
    ...state.user,
    address: { ...state.user.address, city: 'Plovdiv' },
  },
};
console.log('state.user.address.city →', state.user.address.city);
console.log('next.user.address.city  →', next.user.address.city);
console.log('user changed?           →', state.user !== next.user);
console.log('settings reused?        →', state.settings === next.settings, '← nothing changed there');

console.log('\n--- sort mutates! ---');
const scores = [40, 100, 1, 5];
const sorted = scores.sort((x, y) => x - y);
console.log({ scores, sorted, same: scores === sorted });
const scores2 = [40, 100, 1, 5];
const sorted2 = scores2.toSorted((x, y) => x - y);
console.log({ scores2, sorted2, same: scores2 === sorted2 });

/*
TRY:
1. Write `removeFirst(arr)` that returns a new array without the first item, without
   mutating. Test it: is the original intact?
2. Try structuredClone({ greet() {} }). What happens? Why might that be?
3. Object.freeze(obj) — freeze `state` from above, then try state.settings.theme = 'light'.
   Did it work? (Hint: freeze is shallow, too.)
*/
