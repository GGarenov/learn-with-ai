import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { checkPrediction } from '../../tools/predict.js';
import * as exercise from './05-hoisting-and-tdz.js';

const { buildGreeting, processOrder, calculateTotal, findFirstNegative } = exercise;

describe('Part 1 — Predictions', () => {
  for (let n = 1; n <= 12; n++) {
    const id = `h${n}`;
    checkPrediction(id, `snippet ${id}() in 05-hoisting-and-tdz.js`, exercise.predictions[id], exercise[id]);
  }
});

describe('Fix 1 — buildGreeting', () => {
  it('greets the user with a trimmed name', () => {
    assert.equal(buildGreeting('  Ana '), 'Hello, Ana!');
  });
});

describe('Fix 2 — processOrder', () => {
  it('returns status "empty" and total 0 for an order without items', () => {
    assert.deepEqual(processOrder({ items: [] }), { status: 'empty', total: 0 });
  });
  it('calculates the total for an order with items', () => {
    const order = {
      items: [
        { price: 10, quantity: 2 },
        { price: 5, quantity: 1 },
      ],
    };
    assert.deepEqual(processOrder(order), { status: 'ok', total: 25 });
  });
});

describe('Fix 3 — calculateTotal', () => {
  it('sums the prices', () => {
    assert.equal(calculateTotal([{ price: 10 }, { price: 5 }]), 15);
  });
  it('returns 0 for no items', () => {
    assert.equal(calculateTotal([]), 0);
  });
});

describe('Fix 4 — findFirstNegative', () => {
  it('finds the first negative number', () => {
    assert.equal(findFirstNegative([3, -1, -5]), -1);
  });
  it('returns null when there is no negative number', () => {
    assert.equal(findFirstNegative([1, 2, 3]), null);
  });
  it('returns null for an empty array', () => {
    assert.equal(findFirstNegative([]), null);
  });
  it('does not use var', () => {
    assert.doesNotMatch(findFirstNegative.toString(), /\bvar\b/, 'replace var with let/const');
  });
});
