// assumes the main script is in the parent directory
const { getProduct } = require('../product-manager.js');
// assumes the basic test cases are in testUtil directory
const { testReturnsDefined, testCorrectId, testEdgeCases } = require('../testUtil/basic_tests.js');

// Run basic tests
testReturnsDefined(getProduct);
testCorrectId(getProduct);
testEdgeCases(getProduct);