// Lesson 4 — Scope
// Run: node week-01-types-scope/examples/04-scope.js
// This file is an ES module, so it's in strict mode.

console.log('--- block scope vs function scope ---');
function blocks() {
  if (true) {
    var fromVar = 'var leaks out';
    let fromLet = 'let stays inside';
    console.log('inside block:', fromVar, '|', fromLet);
  }
  console.log('outside block:', fromVar);
  console.log('typeof fromLet outside:', typeof fromLet);
}
blocks();

console.log('\n--- lexical scope: where it is WRITTEN matters ---');
const name = 'Ana (module scope)';
function greet() {
  return `Hi, ${name}`;
}
function run() {
  const name = 'Ivan (run scope)';
  return greet();
}
console.log(run());

console.log('\n--- the scope chain ---');
const app = 'Shop';
function outer() {
  const user = 'Ana';
  function inner() {
    const item = 'Book';
    return `${app}: ${user} bought ${item}`;
  }
  return inner();
}
console.log(outer());

console.log('\n--- shadowing ---');
let status = 'idle';
function startLoading() {
  let status = 'loading'; // shadows!
  return status;
}
console.log('returned:', startLoading(), '| outer status:', status);

function startLoadingFixed() {
  status = 'loading'; // assigns the outer variable
}
startLoadingFixed();
console.log('after fix, outer status:', status);

console.log('\n--- strict mode: no accidental globals ---');
function sloppy() {
  // eslint-disable-next-line no-undef
  total = 0;
}
try {
  sloppy();
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}

console.log('\n--- let vs var in loops ---');
const withLet = [];
for (let i = 0; i < 3; i++) {
  withLet.push(() => i);
}
const withVar = [];
for (var j = 0; j < 3; j++) {
  withVar.push(() => j);
}
console.log('let:', withLet.map((fn) => fn()));
console.log('var:', withVar.map((fn) => fn()));

/*
TRY:
1. Inside inner(), try to log a variable declared in run(). What error do you get? Why?
2. Add a parameter called `app` to outer() and call outer('Market'). What does inner see now?
3. Run the debugger (lesson 6) on this file, set a breakpoint inside inner(), and look at
   the Variables panel: you'll see Local, Closure and Module scopes listed separately.
*/
