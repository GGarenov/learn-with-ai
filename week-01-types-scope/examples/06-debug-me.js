// Lesson 6 — debugger practice (Node + VS Code)
//
// The average below comes out as NaN. Find out why WITHOUT reading the data carefully —
// the point is to practice the debugger:
//
// 1. Ctrl+Shift+P → "Debug: JavaScript Debug Terminal"
// 2. Set a breakpoint on the line marked 👉 (click left of the line number)
// 3. In the debug terminal run:  node week-01-types-scope/examples/06-debug-me.js
// 4. Press F10 to step through the loop. Watch `sum` and `student` in the Variables panel.
//    At which student does `sum` turn into NaN? Why?
// 5. Bonus: right-click the breakpoint → Edit Breakpoint → condition: Number.isNaN(sum)
//    Re-run. It now pauses only when something is wrong.

const students = [
  { name: 'Ana', grade: 5.5 },
  { name: 'Ivan', grade: 4 },
  { name: 'Maria', grde: 6 },
  { name: 'Petar', grade: 3.5 },
  { name: 'Elena', grade: 5 },
];

function averageGrade(list) {
  let sum = 0;
  for (const student of list) {
    sum += student.grade; // 👉 breakpoint here
  }
  return sum / list.length;
}

console.log('Average grade:', averageGrade(students));
