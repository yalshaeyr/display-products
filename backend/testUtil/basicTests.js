/**
 * Tests if the function always returns a defined value.
 *
 * @param {Function} func - The function to test.
 * @param {boolean} hasId - If the function passes an id
 * @param {...args} args - The arguments to pass to the function.
 * @return {void}
 */
function testReturnsDefined(func, hasId = true, ...args) {
  const msg = 'returns a Promise that resolves to a defined value';
  test(`${func.name} ${msg}`, async () => {
    const ids = [-1, 1, 50, 100, 1000];
    expect.assertions(hasId ? ids.length : 1);

    if (hasId) {
      for (const id of ids) {
        const result = await func(id, ...args);
        expect(result).toBeDefined();
      }
    } else {
      const result = await func(...args);
      expect(result).toBeDefined();
    }
  });
}

/**
 * Tests if the function returns the correct id.
 *
 * @param {Function} func - The function to test.
 * @return {void}
 */
function testCorrectId(func) {
  const msg = 'returns a Promise that resolves to a product with correct id';
  test(`${func.name} ${msg}`, async () => {
    const ids = [1, 14, 20, 67, 88];
    expect.assertions(ids.length*2);

    for (const id of ids) {
      const result = await func(id);
      expect(result).toBeDefined();
      expect(result.id).toEqual(id);
    }
  });
}

/**
 * Tests if the function fails gracefully.
 *
 * @param {Function} func - The function to test.
 * @return {void}
 */
function testEdgeCases(func) {
  const msg = 'returns a structure with .message attribute for invalid ids';
  test(`${func.name} ${msg}`, async () => {
    const ids = [-1, 0, 101, 9999];
    expect.assertions(ids.length*2);

    for (const id of ids) {
      const result = await func(id);
      expect(result).toBeDefined();
      expect(result).toHaveProperty('message');
    }
  });
}

module.exports = {
  testReturnsDefined,
  testCorrectId,
  testEdgeCases,
};
