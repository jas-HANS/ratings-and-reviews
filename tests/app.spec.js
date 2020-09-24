const sum = (a, b) => a + b;
const mul = (a, b) => a * b;

describe("Filter function", () => {
  test('Adding 1 + 1 equals 2', () => { expect(sum(1, 1)).toBe(2); });
  test('Multiplying 1 * 1 equals 1', () => { expect(mul(1, 1)).toBe(1); });
});