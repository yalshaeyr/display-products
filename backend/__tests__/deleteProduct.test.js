// assumes the main script is in the parent directory
const { deleteProduct } = require('../product-manager.js');
// assumes the basic test cases are in testUtil directory
const { testReturnsDefined, testCorrectId, testEdgeCases } = require('../testUtil/basic_tests.js');


// Run basic tests
testReturnsDefined(deleteProduct);
testCorrectId(deleteProduct);
testEdgeCases(deleteProduct);

// Run specific tests

/**
 * Ensures that the returned product is deleted
 * by checking for the isDeleted attribute to be set to true
 * and that the deletedOn attribute has a value
 */
test('deleteProduct updates the correct product by id', async () => {
    const ids = [6, 13, 28, 72, 100]
    
    expect.assertions(ids.length*3);
  
    // Check that attributes are set correctly
    for (const id of ids) {
        const result = await deleteProduct(id);
        // may seem redundant, but ensures that the test proceeds with an actual Promise
        expect(result).toBeDefined();
        // should be deleted
        expect(result.isDeleted).toEqual(true);
        // should have a time set 
        expect(result.deletedOn).toBeDefined();
    }
});