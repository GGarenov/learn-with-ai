import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  sumEven,
  capitalizeWords,
  countOccurrences,
  getActiveUserNames,
  updateUser,
  createCounter,
  once,
  loadUserNames,
} from './diagnostic.js';

describe('Task 1 — sumEven', () => {
  it('sums only the even numbers', () => {
    assert.equal(sumEven([1, 2, 3, 4]), 6);
  });
  it('returns 0 for an empty array', () => {
    assert.equal(sumEven([]), 0);
  });
  it('handles negative numbers and zero', () => {
    assert.equal(sumEven([-2, 0, 5, 8]), 6);
  });
  it('returns 0 when there are no even numbers', () => {
    assert.equal(sumEven([1, 3, 5]), 0);
  });
});

describe('Task 2 — capitalizeWords', () => {
  it('capitalizes every word', () => {
    assert.equal(capitalizeWords('hello world'), 'Hello World');
  });
  it('lowercases the rest of each word', () => {
    assert.equal(capitalizeWords('jAVAsCRIPT is FUN'), 'Javascript Is Fun');
  });
  it('works with a single letter', () => {
    assert.equal(capitalizeWords('a'), 'A');
  });
  it('returns an empty string for an empty string', () => {
    assert.equal(capitalizeWords(''), '');
  });
});

describe('Task 3 — countOccurrences', () => {
  it('counts every value', () => {
    assert.deepEqual(countOccurrences(['a', 'b', 'a', 'c', 'a']), { a: 3, b: 1, c: 1 });
  });
  it('returns an empty object for an empty array', () => {
    assert.deepEqual(countOccurrences([]), {});
  });
});

describe('Task 4 — getActiveUserNames', () => {
  const users = [
    { name: 'Ivan', active: true },
    { name: 'Petar', active: false },
    { name: 'Ana', active: true },
    { name: 'Maria', active: true },
  ];

  it('returns the active names, sorted alphabetically', () => {
    assert.deepEqual(getActiveUserNames(users), ['Ana', 'Ivan', 'Maria']);
  });
  it('returns an empty array when nobody is active', () => {
    assert.deepEqual(getActiveUserNames([{ name: 'Zoe', active: false }]), []);
  });
  it('does not change the input array', () => {
    const input = structuredClone(users);
    getActiveUserNames(input);
    assert.deepEqual(input, users);
  });
});

describe('Task 5 — updateUser', () => {
  const makeUser = () => ({ name: 'Ana', age: 25, address: { city: 'Sofia', zip: '1000' } });

  it('applies top-level changes', () => {
    assert.deepEqual(updateUser(makeUser(), { age: 26 }), {
      name: 'Ana',
      age: 26,
      address: { city: 'Sofia', zip: '1000' },
    });
  });
  it('merges the address instead of replacing it', () => {
    const result = updateUser(makeUser(), { address: { city: 'Plovdiv' } });
    assert.deepEqual(result.address, { city: 'Plovdiv', zip: '1000' });
  });
  it('does not change the original user', () => {
    const user = makeUser();
    updateUser(user, { age: 30, address: { city: 'Varna' } });
    assert.deepEqual(user, makeUser());
  });
  it('returns a new user object and a new address object', () => {
    const user = makeUser();
    const result = updateUser(user, { age: 30, address: { city: 'Varna' } });
    assert.notEqual(result, user);
    assert.notEqual(result.address, user.address);
  });
});

describe('Task 6 — createCounter', () => {
  it('starts at 0 by default', () => {
    assert.equal(createCounter().getValue(), 0);
  });
  it('increments and decrements', () => {
    const counter = createCounter();
    counter.increment();
    counter.increment();
    counter.decrement();
    assert.equal(counter.getValue(), 1);
  });
  it('accepts a start value and resets back to it', () => {
    const counter = createCounter(10);
    counter.increment();
    counter.increment();
    counter.reset();
    assert.equal(counter.getValue(), 10);
  });
  it('creates independent counters', () => {
    const a = createCounter();
    const b = createCounter();
    a.increment();
    a.increment();
    b.increment();
    assert.equal(a.getValue(), 2);
    assert.equal(b.getValue(), 1);
  });
  it('keeps the value private (only methods are exposed)', () => {
    const counter = createCounter(5);
    for (const value of Object.values(counter)) {
      assert.equal(typeof value, 'function', 'the counter object should only contain functions');
    }
  });
});

describe('Task 7 — once', () => {
  it('calls the function only once', () => {
    let calls = 0;
    const init = once(() => {
      calls++;
      return 'ready';
    });
    init();
    init();
    init();
    assert.equal(calls, 1);
  });
  it('returns the first result on every call', () => {
    const getRandom = once(() => Math.random());
    const first = getRandom();
    assert.equal(getRandom(), first);
    assert.equal(getRandom(), first);
  });
  it('passes the arguments through', () => {
    const add = once((a, b) => a + b);
    assert.equal(add(2, 3), 5);
    assert.equal(add(10, 10), 5);
  });
  it('still calls only once when the function returns undefined', () => {
    let calls = 0;
    const log = once(() => {
      calls++;
    });
    log();
    log();
    assert.equal(calls, 1);
  });
});

describe('Task 8 — loadUserNames', () => {
  const NAMES = { 1: 'Ana', 2: 'Ivan', 3: 'Maria' };

  function createFakeApi() {
    const stats = { inFlight: 0, maxInFlight: 0 };
    const fetchUser = (id) =>
      new Promise((resolve, reject) => {
        stats.inFlight++;
        stats.maxInFlight = Math.max(stats.maxInFlight, stats.inFlight);
        // Higher ids answer faster, so the order of answers differs from the order of ids
        setTimeout(() => {
          stats.inFlight--;
          if (id in NAMES) resolve({ id, name: NAMES[id] });
          else reject(new Error(`User ${id} not found`));
        }, Math.max(0, 30 - id * 5));
      });
    return { fetchUser, stats };
  }

  it('resolves to the names in the same order as the ids', async () => {
    const { fetchUser } = createFakeApi();
    assert.deepEqual(await loadUserNames([1, 2, 3], fetchUser), ['Ana', 'Ivan', 'Maria']);
  });
  it('runs the requests in parallel', async () => {
    const { fetchUser, stats } = createFakeApi();
    await loadUserNames([1, 2, 3], fetchUser);
    assert.equal(stats.maxInFlight, 3, 'the requests ran one after another — start them all at once');
  });
  it('rejects when any request fails', async () => {
    const { fetchUser } = createFakeApi();
    await assert.rejects(loadUserNames([1, 99, 3], fetchUser), /User 99 not found/);
  });
  it('resolves to an empty array when there are no ids', async () => {
    const { fetchUser } = createFakeApi();
    assert.deepEqual(await loadUserNames([], fetchUser), []);
  });
});
