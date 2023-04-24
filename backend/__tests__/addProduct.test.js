// assumes the main script is in the parent directory
const {addProduct, DUMMY_LIMIT} = require('../productManager.js');
// assumes the basic test cases are in testUtil directory
const {testReturnsDefined} = require('../testUtil/basicTests.js');

// Run basic tests
testReturnsDefined(addProduct, false, {});

// Run specific tests

/**
 * Since this backend uses a dummy API,
 * new products should all have the same ID of
 * 101.
 */
test('addProduct returns the correct id', async () => {
  expect.assertions(2);
  const result = await addProduct({});
  expect(result).toBeDefined();
  // the only id that can be allocated is the limit + 1
  expect(result.id).toEqual(DUMMY_LIMIT+1);
});


/**
 * Check that the added product's attributes are identical to
 * the returned product.
 */
test('addProduct returns the correct attributes', async () => {
  // An example product
  const newProducts = [{
    title: 'New product',
    price: 12.50,
    description: 'A new product',
    category: 'Misc',
  }];

  // +1 accounts for ensuring that the response is defined
  expect.assertions(newProducts.length *
      (Object.keys(newProducts[0]).length + 1));

  // Check that attributes match
  for (const newProduct of newProducts) {
    const result = await addProduct(newProduct);
    expect(result).toBeDefined();
    for (const attribute in newProduct) {
      if (newProduct.hasOwnProperty(attribute)) {
        expect(result[attribute]).toEqual(newProduct[attribute]);
      }
    }
  }
});
