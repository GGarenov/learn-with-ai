import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { inspect } from 'node:util';
import { checkPrediction } from '../../tools/predict.js';
import {
  predictions,
  toNumber,
  compact,
  withDefault,
  sumInputs,
  isSameValue,
} from './02-coercion-and-equality.js';

describe('Part 1 — Predictions', () => {
  const cases = [
    ['q1', "'5' + 3", () => '5' + 3],
    ['q2', "'5' - 3", () => '5' - 3],
    ['q3', "'5' * '2'", () => '5' * '2'],
    ['q4', 'true + 1', () => true + 1],
    ['q5', "1 + 2 + '3'", () => 1 + 2 + '3'],
    ['q6', "'1' + 2 + 3", () => '1' + 2 + 3],
    ['q7', '[] + []', () => [] + []],
    ['q8', '[1, 2] + [3]', () => [1, 2] + [3]],
    ['q9', 'null + 1', () => null + 1],
    ['q10', 'undefined + 1', () => undefined + 1],
    ['q11', "'10' == 10", () => '10' == 10],
    ['q12', "0 == ''", () => 0 == ''],
    ['q13', 'null == undefined', () => null == undefined],
    ['q14', 'null === undefined', () => null === undefined],
    ['q15', 'null == 0', () => null == 0],
    ['q16', 'NaN === NaN', () => NaN === NaN],
    ['q17', "Boolean('0')", () => Boolean('0')],
    ['q18', "Boolean('')", () => Boolean('')],
    ['q19', "!!'false'", () => !!'false'],
    ['q20', 'Boolean([])', () => Boolean([])],
    ['q21', "0 || 'default'", () => 0 || 'default'],
    ['q22', "0 ?? 'default'", () => 0 ?? 'default'],
    ['q23', "'' && 'hello'", () => '' && 'hello'],
    ['q24', "'a' && 'b'", () => 'a' && 'b'],
    ['q25', "Number('')", () => Number('')],
    ['q26', "Number('12px')", () => Number('12px')],
    ['q27', "parseInt('12px', 10)", () => parseInt('12px', 10)],
    ['q28', 'typeof NaN', () => typeof NaN],
    ['q29', '0.1 + 0.2 === 0.3', () => 0.1 + 0.2 === 0.3],
    ['q30', 'Object.is(NaN, NaN)', () => Object.is(NaN, NaN)],
  ];
  for (const [id, code, getActual] of cases) {
    checkPrediction(id, code, predictions[id], getActual);
  }
});

describe('Task 1 — toNumber', () => {
  const valid = [
    [42, 42],
    [-3.5, -3.5],
    [0, 0],
    ['42', 42],
    ['3.14', 3.14],
    ['  7  ', 7],
    ['-10', -10],
  ];
  for (const [input, expected] of valid) {
    it(`toNumber(${inspect(input)}) → ${expected}`, () => {
      assert.equal(toNumber(input), expected);
    });
  }
  const invalid = ['', '   ', 'abc', '12px', NaN, Infinity, null, undefined, true, false, [], {}];
  for (const input of invalid) {
    it(`toNumber(${inspect(input)}) → null`, () => {
      assert.equal(toNumber(input), null);
    });
  }
});

describe('Task 2 — compact', () => {
  it('removes every falsy value', () => {
    assert.deepEqual(compact([0, 1, false, 2, '', 3, null, undefined, NaN, 'a']), [1, 2, 3, 'a']);
  });
  it('keeps the truthy surprises', () => {
    assert.deepEqual(compact(['0', 'false', [], {}, -1]), ['0', 'false', [], {}, -1]);
  });
  it('does not mutate the input', () => {
    const input = [0, 1, '', 2];
    compact(input);
    assert.deepEqual(input, [0, 1, '', 2]);
  });
  it('returns a new array even if nothing was removed', () => {
    const input = [1, 2, 3];
    assert.notEqual(compact(input), input);
  });
});

describe('Task 3 — withDefault', () => {
  it('uses the default for undefined', () => {
    assert.equal(withDefault(undefined, 10), 10);
  });
  it('uses the default for null', () => {
    assert.equal(withDefault(null, 'none'), 'none');
  });
  for (const value of [0, '', false, NaN]) {
    it(`keeps ${inspect(value)}`, () => {
      assert.equal(withDefault(value, 'default'), value);
    });
  }
  it('keeps normal values', () => {
    assert.equal(withDefault('Ana', 'Guest'), 'Ana');
  });
});

describe('Task 4 — sumInputs', () => {
  it('sums numeric strings', () => {
    assert.equal(sumInputs(['10', '5', '2.5']), 17.5);
  });
  it('skips empty and invalid inputs', () => {
    assert.equal(sumInputs(['10', '', 'abc', ' 5 ', '12px']), 15);
  });
  it('returns 0 for no inputs', () => {
    assert.equal(sumInputs([]), 0);
  });
  it('returns a number', () => {
    assert.equal(typeof sumInputs(['1', '2']), 'number');
  });
});

describe('⭐ Task 5 — isSameValue', () => {
  const obj = {};
  const cases = [
    [1, 1, true],
    ['a', 'a', true],
    [1, '1', false],
    [NaN, NaN, true],
    [0, -0, false],
    [-0, -0, true],
    [0, 0, true],
    [{}, {}, false],
    [obj, obj, true],
    [null, undefined, false],
    [null, null, true],
  ];
  for (const [a, b, expected] of cases) {
    it(`isSameValue(${inspect(a)}, ${inspect(b)}) → ${expected}`, () => {
      assert.equal(isSameValue(a, b), expected);
    });
  }
  it('does not use Object.is', () => {
    assert.doesNotMatch(isSameValue.toString(), /Object\.is/);
  });
});
