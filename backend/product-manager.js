// The dummy backend being used 
const BACKEND = 'https://dummyjson.com'
// The max number of products stored in the backend
const DUMMY_LIMIT = 100;


/**
 * Returns a single product 
 *
 * @param {number} id - The id of the product 
 * @returns {Promise} product - The product as a Promise
 */
function getProduct(id)
{
	let product = fetch(`${BACKEND}/products/${id}`)
	.then(res => res.json())
	
	return product 
}

/**
 * Update a product 
 *
 * @param {number} id - The id of the product 
 * @param {Product} productData - The desired new attributes for the product 
 * @returns {Promise} result - The result of the update request 
 */
function updateProduct(id, productData)
{
	let result = fetch(`${BACKEND}/products/${id}`, {
	  method: 'PATCH',
	  headers: { 'Content-Type': 'application/json' },
	  body: JSON.stringify(productData)
	})
	.then(res => res.json())
	
	return result;
}

/**
 * Delete a product 
 *
 * @param {number} id - The id of the product 
 * @returns {Promise} result - The result of the delete request 
 */
function deleteProduct(id)
{
	let result = fetch(`${BACKEND}/products/${id}`, {
	  method: 'DELETE',
	})
	.then(res => res.json())
	
	return result; 
}


/**
 * Returns all available products within the limit
 * 
 * @param {number} limit - The maximum number of products to return.
 * This specific backend only supports 100). Defaults to 30.
 * @returns {Promise} products - The products as a Promise in JSON format 
 */
function getAllProducts(limit = 30)
{
    // return at least one product
    limit = (limit <= 0 ) ? 1 : limit; 
	// constrain the limit to that of the dummy backend 
	limit = (limit > DUMMY_LIMIT) ? DUMMY_LIMIT : limit;
    
	
	let products = fetch(`${BACKEND}/products?limit=${limit}`)
	.then(res => res.json())
	
	return products;
}


/**
 * Searches the list of displayed products 
 * 
 * @param {} query - The query to search with 
 * @returns {Promise} products - The products which match the query as a Promise in JSON format 
 */
function searchList(query)
{
	// to-do
}

// Export functions for testing
module.exports = {
    getProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    DUMMY_LIMIT,
};