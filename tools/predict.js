// Test helpers for "predict the output" exercises. You don't need to edit (or read) this file.
import { it } from 'node:test';
import assert from 'node:assert/strict';
import { inspect } from 'node:util';

export const NOT_ANSWERED = '?';

/** Runs `fn` and returns its result — or the error name ('ReferenceError', 'TypeError', ...) if it throws. */
export function outcome(fn) {
  try {
    return fn();
  } catch (error) {
    return error.name;
  }
}

/** Registers one test that compares a prediction with what `getActual` really produces. */
export function checkPrediction(id, label, predicted, getActual) {
  it(`${id}: ${label}`, () => {
    if (predicted === NOT_ANSWERED) {
      assert.fail(`${id} is not answered yet`);
    }
    const actual = outcome(getActual);
    assert.deepStrictEqual(
      predicted,
      actual,
      `${id}: you predicted ${inspect(predicted)}, but the actual result is ${inspect(actual)}.\n` +
        '   → Before you change your answer, figure out WHY. Then add it to PROGRESS.md → Weak spots.',
    );
  });
}
