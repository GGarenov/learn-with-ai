// Lesson 5 — Hoisting & the TDZ
// Run: node week-01-types-scope/examples/05-hoisting-and-tdz.js

function tryRun(label, fn) {
  try {
    console.log(label.padEnd(42), '→', fn());
  } catch (error) {
    console.log(label.padEnd(42), '→', `${error.name}: ${error.message}`);
  }
}

tryRun('function declaration called before', () => {
  const result = add(2, 3);
  function add(x, y) {
    return x + y;
  }
  return result;
});

tryRun('var read before its line', () => {
  const result = city;
  var city = 'Sofia';
  return result;
});

tryRun('let read before its line', () => {
  const result = country;
  let country = 'BG';
  return result;
});

tryRun('const arrow called before', () => {
  const result = greet();
  const greet = () => 'hi';
  return result;
});

tryRun('var function expression called before', () => {
  const result = hello();
  var hello = function () {
    return 'hi';
  };
  return result;
});

tryRun('class used before', () => {
  const result = new Car();
  class Car {}
  return result;
});

tryRun('shadowed const in the TDZ', () => {
  const level = 'outer';
  function read() {
    const result = level;
    const level = 'inner';
    return result;
  }
  return read();
});

tryRun('later const used inside a function (OK!)', () => {
  function getTax() {
    return price * 0.2;
  }
  const price = 100;
  return getTax();
});

tryRun('typeof a variable that never existed', () => typeof neverDeclared);

tryRun('typeof a let in the TDZ', () => {
  const result = typeof score;
  let score = 10;
  return result;
});

tryRun('variable that does not exist at all', () => notDefinedAnywhere);

/*
TRY:
1. Compare the error messages above: "is not defined" vs "Cannot access ... before
   initialization" vs "is not a function". Say out loud what each one means.
2. In 'later const used inside a function', move `return getTax();` above `const price`.
   What happens now and why?
3. Write your own snippet that would print `undefined` with var but throw with let.
*/
