import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  updateName,
  addItem,
  updateCity,
  toggleTodo,
  removeAt,
  isShallowEqual,
  deepClone,
} from './03-primitives-vs-references.js';

describe('Task 1 — updateName', () => {
  const makeUser = () => ({ name: 'Ana', age: 25, role: 'dev' });

  it('returns a user with the new name and the other properties kept', () => {
    assert.deepEqual(updateName(makeUser(), 'Maria'), { name: 'Maria', age: 25, role: 'dev' });
  });
  it('does not mutate the original user', () => {
    const user = makeUser();
    updateName(user, 'Maria');
    assert.deepEqual(user, makeUser());
  });
  it('returns a new object', () => {
    const user = makeUser();
    assert.notEqual(updateName(user, 'Maria'), user);
  });
});

describe('Task 2 — addItem', () => {
  const makeCart = () => ({ items: [{ name: 'Pen', price: 2 }], total: 2 });
  const book = { name: 'Book', price: 12.5 };

  it('adds the item at the end', () => {
    assert.deepEqual(addItem(makeCart(), book).items, [
      { name: 'Pen', price: 2 },
      { name: 'Book', price: 12.5 },
    ]);
  });
  it('increases the total', () => {
    assert.equal(addItem(makeCart(), book).total, 14.5);
  });
  it('does not mutate the original cart or its items', () => {
    const cart = makeCart();
    addItem(cart, book);
    assert.deepEqual(cart, makeCart());
  });
  it('returns a new cart and a new items array', () => {
    const cart = makeCart();
    const result = addItem(cart, book);
    assert.notEqual(result, cart);
    assert.notEqual(result.items, cart.items);
  });
});

describe('Task 3 — updateCity', () => {
  const makeUser = () => ({
    name: 'Ana',
    address: { city: 'Sofia', street: 'Vitosha 1' },
    settings: { theme: 'dark' },
  });

  it('changes the city and keeps everything else', () => {
    assert.deepEqual(updateCity(makeUser(), 'Varna'), {
      name: 'Ana',
      address: { city: 'Varna', street: 'Vitosha 1' },
      settings: { theme: 'dark' },
    });
  });
  it('does not mutate the original user', () => {
    const user = makeUser();
    updateCity(user, 'Varna');
    assert.deepEqual(user, makeUser());
  });
  it('creates new objects on the changed path', () => {
    const user = makeUser();
    const result = updateCity(user, 'Varna');
    assert.notEqual(result, user, 'the user should be a new object');
    assert.notEqual(result.address, user.address, 'the address should be a new object');
  });
  it('reuses the parts that did not change (structural sharing)', () => {
    const user = makeUser();
    const result = updateCity(user, 'Varna');
    assert.equal(
      result.settings,
      user.settings,
      'settings did not change, so it should be the SAME object — copy only the changed path',
    );
  });
});

describe('Task 4 — toggleTodo', () => {
  const makeTodos = () => [
    { id: 1, text: 'Learn JS', done: false },
    { id: 2, text: 'Learn React', done: false },
    { id: 3, text: 'Become Mid', done: true },
  ];

  it('flips done for the matching todo', () => {
    assert.equal(toggleTodo(makeTodos(), 1)[0].done, true);
    assert.equal(toggleTodo(makeTodos(), 3)[2].done, false);
  });
  it('leaves the other todos unchanged', () => {
    const result = toggleTodo(makeTodos(), 1);
    assert.deepEqual(result.slice(1), makeTodos().slice(1));
  });
  it('does not mutate the original array or todos', () => {
    const todos = makeTodos();
    toggleTodo(todos, 1);
    assert.deepEqual(todos, makeTodos());
  });
  it('creates a new object only for the changed todo', () => {
    const todos = makeTodos();
    const result = toggleTodo(todos, 1);
    assert.notEqual(result, todos, 'the array should be new');
    assert.notEqual(result[0], todos[0], 'the toggled todo should be a new object');
    assert.equal(result[1], todos[1], 'unchanged todos should be the SAME objects');
    assert.equal(result[2], todos[2], 'unchanged todos should be the SAME objects');
  });
  it('returns an equal copy if the id does not exist', () => {
    const todos = makeTodos();
    const result = toggleTodo(todos, 99);
    assert.deepEqual(result, makeTodos());
    assert.notEqual(result, todos);
  });
});

describe('Task 5 — removeAt', () => {
  it('removes the item at the index', () => {
    assert.deepEqual(removeAt(['a', 'b', 'c'], 1), ['a', 'c']);
    assert.deepEqual(removeAt(['a', 'b', 'c'], 0), ['b', 'c']);
    assert.deepEqual(removeAt(['a', 'b', 'c'], 2), ['a', 'b']);
  });
  it('does not mutate the input', () => {
    const input = ['a', 'b', 'c'];
    removeAt(input, 1);
    assert.deepEqual(input, ['a', 'b', 'c']);
  });
  it('returns a copy for an index that is too big', () => {
    const input = ['a', 'b'];
    const result = removeAt(input, 5);
    assert.deepEqual(result, ['a', 'b']);
    assert.notEqual(result, input);
  });
  it('returns a copy for a negative index', () => {
    const input = ['a', 'b'];
    const result = removeAt(input, -1);
    assert.deepEqual(result, ['a', 'b']);
    assert.notEqual(result, input);
  });
});

describe('⭐ Task 6 — isShallowEqual', () => {
  const shared = { n: 1 };
  it('true for the same primitive values', () => {
    assert.equal(isShallowEqual({ a: 1, b: 'x' }, { a: 1, b: 'x' }), true);
  });
  it('true when nested values are the same reference', () => {
    assert.equal(isShallowEqual({ a: shared }, { a: shared }), true);
  });
  it('false when nested values are different objects with the same content', () => {
    assert.equal(isShallowEqual({ a: { n: 1 } }, { a: { n: 1 } }), false);
  });
  it('false when a value differs', () => {
    assert.equal(isShallowEqual({ a: 1, b: 2 }, { a: 1, b: 3 }), false);
  });
  it('false when the number of keys differs', () => {
    assert.equal(isShallowEqual({ a: 1 }, { a: 1, b: 2 }), false);
    assert.equal(isShallowEqual({ a: 1, b: 2 }, { a: 1 }), false);
  });
  it('true for two empty objects', () => {
    assert.equal(isShallowEqual({}, {}), true);
  });
  it('treats NaN as equal to NaN', () => {
    assert.equal(isShallowEqual({ a: NaN }, { a: NaN }), true);
  });
});

describe('⭐ Task 7 — deepClone', () => {
  const makeData = () => ({
    name: 'Ana',
    tags: ['js', 'react'],
    address: { city: 'Sofia', geo: { lat: 42.7, lng: 23.3 } },
    orders: [{ id: 1, items: [{ sku: 'A' }] }],
    empty: null,
  });

  it('returns primitives as they are', () => {
    assert.equal(deepClone(42), 42);
    assert.equal(deepClone('hi'), 'hi');
    assert.equal(deepClone(null), null);
    assert.equal(deepClone(undefined), undefined);
  });
  it('produces an equal structure', () => {
    assert.deepEqual(deepClone(makeData()), makeData());
  });
  it('creates new objects and arrays at every level', () => {
    const data = makeData();
    const clone = deepClone(data);
    assert.notEqual(clone, data);
    assert.notEqual(clone.tags, data.tags);
    assert.notEqual(clone.address, data.address);
    assert.notEqual(clone.address.geo, data.address.geo);
    assert.notEqual(clone.orders[0], data.orders[0]);
    assert.notEqual(clone.orders[0].items, data.orders[0].items);
  });
  it('changing the clone does not affect the original', () => {
    const data = makeData();
    const clone = deepClone(data);
    clone.address.geo.lat = 0;
    clone.orders[0].items.push({ sku: 'B' });
    assert.deepEqual(data, makeData());
  });
  it('keeps arrays as arrays', () => {
    assert.equal(Array.isArray(deepClone([1, [2, 3]])[1]), true);
  });
  it('does not use structuredClone or JSON', () => {
    assert.doesNotMatch(deepClone.toString(), /structuredClone|JSON/);
  });
});
