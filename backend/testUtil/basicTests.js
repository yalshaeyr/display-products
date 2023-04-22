/**
 * The most basic test. The function should return a Promise that
 * resolves to a defined value. Since Promises are asynchronous,
 * this function (and subsequent) will use the async/await design
 */
function testReturnsDefined(func, ...args) {
    test(`${func.name} returns a Promise that resolves to a defined value`, async () => {
      const ids = [-1, 1, 50, 100, 1000]
      expect.assertions(ids.length);
  
      for (const id of ids) {
        const result = await func(id, ...args);
        expect(result).toBeDefined();
      }
    });
  }

/**
 * Ensure that the retrieved id is identical to the requested id
 */
function testCorrectId(func) {
    test(`${func.name} returns a Promise that resolves to a product with correct id`, async () => {
        const ids = [1, 14, 20, 67, 88]
        expect.assertions(ids.length*2);

        for (const id of ids) {
            const result = await func(id);
            expect(result).toBeDefined();
            expect(result.id).toEqual(id);
        }
    });
}

/**
 * Ensure that the function handles edge cases gracefully
 */
function testEdgeCases(func) {
    test(`${func.name} returns a structure with .message attribute for out of range ids`, async () => {
        const ids = [-1, 0, 101, 9999]
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
    testEdgeCases
};