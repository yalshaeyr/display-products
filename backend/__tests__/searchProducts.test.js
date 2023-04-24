// assumes the main script is in the parent directory
const {searchProducts} = require('../productManager.js');
// assumes the basic test cases are in testUtil directory
const {testReturnsDefined} = require('../testUtil/basicTests.js');

// Run basic tests
testReturnsDefined(searchProducts, false, '');

// Run specific tests

/**
 * The dummy API matches the query to the title and description.
 * This tests if that is the case and there are no odd results.
 */
test('searchProducts correctly matches the query', async () => {
  const queries = ['sweater', 'top', 'phone', 'mac', 'medicine'];
  for (const query of queries) {
    const result = await searchProducts(query);
    expect(result).toBeDefined();

    for (const product of result.products) {
      // the dummy will match the query to these attributes
      expect(product['title'].includes(query) ||
        product['description'.includes(query)]);
    }
  };

  // we won't know how many search queries are returned
  expect.assertions();
});
