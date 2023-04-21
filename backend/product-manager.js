/**
 * Returns a single product 
 *
 * @param {number} id - The id of the product 
 * @returns {Promise} product - The product as a Promise
 */
function getProduct(id)
{
	
}

function updateProduct(id, ...args)
{
	
}

function deleteProduct(id)
{
	
}

function getAllProducts()
{
	return fetch('https://dummyjson.com/products')
	.then(res => res.json())
}

function searchList(query)
{
	
}


getAllProducts().then(data => {console.log(data);});