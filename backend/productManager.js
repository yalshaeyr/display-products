// The dummy backend being used
const BACKEND = 'https://dummyjson.com';
// The max number of products stored in the backend
const DUMMY_LIMIT = 100;

/**
 * Add a product
 *
 * @param {object} productData - The desired attributes for the new product
 * @return {Promise} product - The product as a Promise
 */
function addProduct(productData) {
  const product = fetch(`${BACKEND}/products/add`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(productData),
  })
      .then((res) => res.json());

  return product;
}

/**
 * Returns a single product
 *
 * @param {number} id - The id of the product
 * @return {Promise} product - The product as a Promise
 */
function getProduct(id) {
  const product = fetch(`${BACKEND}/products/${id}`)
      .then((res) => res.json());

  return product;
}

/**
 * Update a product
 *
 * @param {number} id - The id of the product
 * @param {object} productData - The desired new attributes for the product
 * @return {Promise} product - The product resulting from the update request
 */
function updateProduct(id, productData) {
  const product = fetch(`${BACKEND}/products/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(productData),
  })
      .then((res) => res.json());

  return product;
}

/**
 * Delete a product
 *
 * @param {number} id - The id of the product
 * @return {Promise} result - The result of the delete request
 */
function deleteProduct(id) {
  const result = fetch(`${BACKEND}/products/${id}`, {
    method: 'DELETE',
  })
      .then((res) => res.json());

  return result;
}


/**
 * Returns all available products within the limit
 *
 * @param {number} limit - The maximum number of products to return.
 * This specific backend only supports 100). Defaults to 30.
 * @return {Promise} products - The products as a Promise in JSON format
 */
function getAllProducts(limit = 30) {
  // return at least one product
  limit = (limit <= 0 ) ? 1 : limit;
  // constrain the limit to that of the dummy backend
  limit = (limit > DUMMY_LIMIT) ? DUMMY_LIMIT : limit;


  const products = fetch(`${BACKEND}/products?limit=${limit}`)
      .then((res) => res.json());

  return products;
}


/**
 * Searches the list of displayed products
 *
 * @param {string} query - The query to search with
 * @return {Promise} products - The products which
 * match the query as a Promise in JSON format
 */
function searchProducts(query) {
  products = fetch(`${BACKEND}/products/search?q=${query}`)
      .then((res) => res.json());

  return products;
}

// Export functions for testing
module.exports = {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  searchProducts,
  DUMMY_LIMIT,
};
