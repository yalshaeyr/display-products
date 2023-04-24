// assumes the main script is in the parent directory
const {updateProduct} = require('../productManager.js');
// assumes the basic test cases are in testUtil directory
const {testReturnsDefined} = require('../testUtil/basicTests.js');

// Run basic tests
testReturnsDefined(updateProduct, {});

// Run specific tests

/**
 * Ensure that returned product matches the requested product,
 * i.e., the attributes are equal
 */
test('updateProduct updates the correct product and attributes', async () => {
  // An example update
  const updatedProducts = [
    {
      id: 1,
      title: 'Updated product',
      price: 100.50,
      description: 'An updated product',
      category: 'Misc',
    },
  ];

  // +1 accounts for ensuring that the response is defined
  expect.assertions((updatedProducts.length *
    Object.keys(updatedProducts[0]).length) + 1);

  // Check that attributes match
  for (const updatedProduct of updatedProducts) {
    const {id, ...updatedProductBody} = updatedProduct;
    const result = await updateProduct(id,
        updatedProductBody);
    expect(result).toBeDefined();

    for (const attribute in updatedProduct) {
      if (updatedProduct.hasOwnProperty(attribute)) {
        expect(result[attribute]).toEqual(updatedProduct[attribute]);
      }
    }
  }
});


