import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { checkPrediction } from '../../tools/predict.js';
import * as exercise from './04-scope.js';

const { createCallbacks, getDiscount, countWords, login, logout, getCurrentUser } = exercise;

describe('Part 1 — Predictions', () => {
  for (let n = 1; n <= 10; n++) {
    const id = `s${n}`;
    checkPrediction(id, `snippet ${id}() in 04-scope.js`, exercise.predictions[id], exercise[id]);
  }
});

describe('Bug 1 — createCallbacks', () => {
  it('each callback returns its own index', () => {
    const callbacks = createCallbacks();
    assert.deepEqual(
      callbacks.map((callback) => callback()),
      [0, 1, 2],
    );
  });
});

describe('Bug 2 — getDiscount', () => {
  it('premium users get 0.2', () => {
    assert.equal(getDiscount({ isPremium: true }), 0.2);
  });
  it('regular users get 0', () => {
    assert.equal(getDiscount({ isPremium: false }), 0);
  });
});

describe('Bug 3 — countWords', () => {
  it('counts words', () => {
    assert.equal(countWords('hello big world'), 3);
  });
  it('ignores extra spaces', () => {
    assert.equal(countWords('  spaced   out  '), 2);
  });
  it('returns 0 for an empty string', () => {
    assert.equal(countWords(''), 0);
  });
});

describe('Bug 4 — login / logout / getCurrentUser', () => {
  it('nobody is logged in after logout', () => {
    logout();
    assert.equal(getCurrentUser(), null);
  });
  it('login stores the current user', () => {
    login('Ana');
    assert.deepEqual(getCurrentUser(), { name: 'Ana' });
  });
  it('login returns the same object that getCurrentUser returns', () => {
    const user = login('Ivan');
    assert.equal(getCurrentUser(), user);
  });
  it('logout clears the current user', () => {
    login('Maria');
    logout();
    assert.equal(getCurrentUser(), null);
  });
});
