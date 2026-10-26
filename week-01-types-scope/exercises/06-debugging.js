/**
 * Exercise 6 — Bug hunt 🐛
 * Lesson: lessons/06-debugging.md
 *
 * A colleague left for vacation with this code "almost done". The tests describe the
 * correct behavior. Your job: make them pass.
 *
 * THE RULES FOR THIS EXERCISE
 * - Don't find the bugs by staring at the code. Use the debugger (lesson 6, section 4):
 *     1. Ctrl+Shift+P → "Debug: JavaScript Debug Terminal"
 *     2. Set a breakpoint inside calculateInvoice
 *     3. Run: node --test week-01-types-scope/exercises/06-debugging.test.js
 *     4. Step through and watch the variables. Where does a value go wrong?
 * - Fix one bug at a time, then re-run the tests.
 * - For every bug, leave a comment like you would in a PR:
 *     // BUG: <what was wrong> → <why it happened>
 *
 * There are 5 bugs in calculateInvoice (including its helper) and 2 in getUserCity.
 */

const DISCOUNTS = {
  SAVE10: 0.1,
  SAVE20: 0.2,
};

const VAT_RATE = 0.2;

function round2(value) {
  return Math.round((value * 100) / 100);
}

/**
 * Calculates an invoice for an order.
 *
 * order = {
 *   items: [{ name: 'Book', price: 12.5, quantity: 2 }, ...],  // price may arrive as a string: '12.50'
 *   discountCode: 'save10',                                     // optional, case-insensitive
 *   customer: { country: 'BG' },
 * }
 *
 * Returns { subtotal, discount, vat, total }, every number rounded to 2 decimals:
 *   subtotal = sum of price * quantity
 *   discount = subtotal * discount rate (0 if there's no code or the code is unknown)
 *   vat      = 20% of (subtotal - discount), only for customers from 'BG', otherwise 0
 *   total    = subtotal - discount + vat
 *
 * Must NOT modify the order.
 */
export function calculateInvoice(order) {
  let subtotal;
  for (const item of order.items) {
    item.price = Number(item.price);
    subtotal += item.price * item.quantity;
  }

  const code = order.discountCode.toUpperCase();
  const rate = DISCOUNTS[code] || 0;
  const discount = subtotal * rate;

  let vat = 0;
  if (order.customer.country = 'BG') {
    vat = (subtotal - discount) * VAT_RATE;
  }

  return {
    subtotal: round2(subtotal),
    discount: round2(discount),
    vat: round2(vat),
    total: round2(subtotal - discount + vat),
  };
}

/**
 * Returns the city of the user with the given id, or 'Unknown' if the user
 * doesn't exist or has no address.
 * The id may be a number or a string (e.g. '1' read from a URL).
 *
 * const users = [{ id: 1, name: 'Ana', address: { city: 'Sofia' } }, { id: 2, name: 'Ivan' }];
 * getUserCity(users, 1)   → 'Sofia'
 * getUserCity(users, '1') → 'Sofia'
 * getUserCity(users, 2)   → 'Unknown'
 * getUserCity(users, 99)  → 'Unknown'
 */
export function getUserCity(users, id) {
  let user;
  for (const candidate of users) {
    if (candidate.id === id) {
      user = candidate;
    }
  }
  return user.address.city;
}
