// assumes the main script is in the parent directory
const { getAllProducts, DUMMY_LIMIT, DEFAULT_LIMIT } = require('../product-manager.js');

/** 
 * Returns a defined Promise
 */
test(`getAllProducts returns a defined Promise`, async () => {
    const limits = [-500, 25, 1000]
    expect.assertions(limits.length);

    for (const limit of limits) {
      const result = await getAllProducts(limit);
      expect(result).toBeDefined();
    }
});


/** 
 * Should return at least one product
 */
test(`getAllProducts does not exceed the dummy limit`, async () => {
    const limits = [-10, 0]
    expect.assertions(limits.length*2);

    for (const limit of limits) {
      const result = await getAllProducts(limit);
      expect(result).toBeDefined();
      expect(result.limit).toEqual(1);
    }
});


/** 
 * The limit should never be greater than the dummy limit
 */
test(`getAllProducts does not exceed the dummy limit`, async () => {
    const limits = [1000, 9999]
    expect.assertions(limits.length*2);

    for (const limit of limits) {
      const result = await getAllProducts(limit);
      expect(result).toBeDefined();
      expect(result.limit).toEqual(DUMMY_LIMIT);
    }
});


/** 
 * The limit returned should be equivalent to the limit passed
 */
test(`getAllProducts respects the limit passed to it`, async () => {
    const limits = [3, 10, 50, 72, 100]
    expect.assertions(limits.length*2);

    for (const limit of limits) {
      const result = await getAllProducts(limit);
      expect(result).toBeDefined();
      expect(result.limit).toEqual(limit);
    }
});
