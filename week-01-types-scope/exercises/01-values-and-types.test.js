import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { inspect } from 'node:util';
import {
  getType,
  isValidNumber,
  formatPrice,
  addMoney,
  isEmpty,
  countTypes,
} from './01-values-and-types.js';

describe('Task 1 — getType', () => {
  const cases = [
    ['hello', 'string'],
    ['', 'string'],
    [42, 'number'],
    [3.14, 'number'],
    [NaN, 'nan'],
    [true, 'boolean'],
    [undefined, 'undefined'],
    [null, 'null'],
    [[], 'array'],
    [[1, 2, 3], 'array'],
    [{}, 'object'],
    [{ a: 1 }, 'object'],
    [() => {}, 'function'],
    [10n, 'bigint'],
    [Symbol('id'), 'symbol'],
  ];
  for (const [value, expected] of cases) {
    it(`getType(${inspect(value)}) → '${expected}'`, () => {
      assert.equal(getType(value), expected);
    });
  }
});

describe('Task 2 — isValidNumber', () => {
  for (const value of [42, 0, -0.5, 1e6]) {
    it(`true for ${inspect(value)}`, () => {
      assert.equal(isValidNumber(value), true);
    });
  }
  for (const value of [NaN, Infinity, -Infinity, '42', '', null, undefined, true, [], 10n]) {
    it(`false for ${inspect(value)}`, () => {
      assert.equal(isValidNumber(value), false);
    });
  }
});

describe('Task 3 — formatPrice', () => {
  it('formats with 2 decimals and EUR by default', () => {
    assert.equal(formatPrice(12.5), '12.50 EUR');
  });
  it('uses the given currency', () => {
    assert.equal(formatPrice(3, 'USD'), '3.00 USD');
  });
  it('formats zero', () => {
    assert.equal(formatPrice(0), '0.00 EUR');
  });
  it('rounds to 2 decimals', () => {
    assert.equal(formatPrice(1234.567), '1234.57 EUR');
  });
  it('formats negative amounts', () => {
    assert.equal(formatPrice(-5), '-5.00 EUR');
  });
  for (const value of ['12', NaN, null, undefined, Infinity]) {
    it(`returns 'Invalid price' for ${inspect(value)}`, () => {
      assert.equal(formatPrice(value), 'Invalid price');
    });
  }
});

describe('Task 4 — addMoney', () => {
  it('0.1 + 0.2 → 0.3', () => {
    assert.equal(addMoney(0.1, 0.2), 0.3);
  });
  it('19.99 + 5.01 → 25', () => {
    assert.equal(addMoney(19.99, 5.01), 25);
  });
  it('1.1 + 2.2 → 3.3', () => {
    assert.equal(addMoney(1.1, 2.2), 3.3);
  });
  it('10 + 2.5 → 12.5', () => {
    assert.equal(addMoney(10, 2.5), 12.5);
  });
  it('returns a number, not a string', () => {
    assert.equal(typeof addMoney(0.1, 0.2), 'number');
  });
});

describe('Task 5 — isEmpty', () => {
  for (const value of [null, undefined, '', '   ', [], {}]) {
    it(`true for ${inspect(value)}`, () => {
      assert.equal(isEmpty(value), true);
    });
  }
  for (const value of [0, false, NaN, 'a', ' a ', [0], [undefined], { a: 1 }, { key: undefined }]) {
    it(`false for ${inspect(value)}`, () => {
      assert.equal(isEmpty(value), false);
    });
  }
});

describe('⭐ Task 6 — countTypes', () => {
  it('counts each type', () => {
    assert.deepEqual(countTypes([1, 'a', null, 2, [], NaN, 'b', {}]), {
      number: 2,
      string: 2,
      null: 1,
      array: 1,
      nan: 1,
      object: 1,
    });
  });
  it('returns an empty object for an empty array', () => {
    assert.deepEqual(countTypes([]), {});
  });
});
