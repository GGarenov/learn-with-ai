import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculateInvoice, getUserCity } from './06-debugging.js';

describe('calculateInvoice', () => {
  it('calculates a simple order for a BG customer without a discount code', () => {
    const order = {
      items: [
        { name: 'Book', price: 10, quantity: 2 },
        { name: 'Pen', price: 5.5, quantity: 1 },
      ],
      customer: { country: 'BG' },
    };
    assert.deepEqual(calculateInvoice(order), { subtotal: 25.5, discount: 0, vat: 5.1, total: 30.6 });
  });

  it('applies a discount code, and no VAT outside BG', () => {
    const order = {
      items: [{ name: 'Lamp', price: 20, quantity: 3 }],
      discountCode: 'SAVE10',
      customer: { country: 'DE' },
    };
    assert.deepEqual(calculateInvoice(order), { subtotal: 60, discount: 6, vat: 0, total: 54 });
  });

  it('accepts lowercase discount codes and prices given as strings', () => {
    const order = {
      items: [{ name: 'Mug', price: '12.50', quantity: 2 }],
      discountCode: 'save20',
      customer: { country: 'BG' },
    };
    assert.deepEqual(calculateInvoice(order), { subtotal: 25, discount: 5, vat: 4, total: 24 });
  });

  it('ignores unknown discount codes', () => {
    const order = {
      items: [{ name: 'Cap', price: 15, quantity: 1 }],
      discountCode: 'FREE100',
      customer: { country: 'US' },
    };
    assert.deepEqual(calculateInvoice(order), { subtotal: 15, discount: 0, vat: 0, total: 15 });
  });

  it('rounds every number to 2 decimals', () => {
    const order = {
      items: [{ name: 'Sock', price: 9.99, quantity: 3 }],
      customer: { country: 'BG' },
    };
    assert.deepEqual(calculateInvoice(order), { subtotal: 29.97, discount: 0, vat: 5.99, total: 35.96 });
  });

  it('returns zeros for an order without items', () => {
    const order = { items: [], customer: { country: 'BG' } };
    assert.deepEqual(calculateInvoice(order), { subtotal: 0, discount: 0, vat: 0, total: 0 });
  });

  it('does not modify the order', () => {
    const order = {
      items: [{ name: 'Mug', price: '12.50', quantity: 2 }],
      discountCode: 'save10',
      customer: { country: 'DE' },
    };
    const snapshot = structuredClone(order);
    calculateInvoice(order);
    assert.deepEqual(order, snapshot);
  });
});

describe('getUserCity', () => {
  const users = [
    { id: 1, name: 'Ana', address: { city: 'Sofia' } },
    { id: 2, name: 'Ivan' },
    { id: 3, name: 'Maria', address: { city: 'Varna' } },
  ];

  it('returns the city of an existing user', () => {
    assert.equal(getUserCity(users, 1), 'Sofia');
    assert.equal(getUserCity(users, 3), 'Varna');
  });
  it('accepts the id as a string', () => {
    assert.equal(getUserCity(users, '3'), 'Varna');
  });
  it("returns 'Unknown' for a user without an address", () => {
    assert.equal(getUserCity(users, 2), 'Unknown');
  });
  it("returns 'Unknown' for a user that doesn't exist", () => {
    assert.equal(getUserCity(users, 99), 'Unknown');
  });
  it("returns 'Unknown' for an empty list", () => {
    assert.equal(getUserCity([], 1), 'Unknown');
  });
});
