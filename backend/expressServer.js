// Import functions
const {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  searchProducts} = require('./productManager.js');

const express = require('express'); // import server
const bodyParser = require('body-parser'); // parser
const cors = require('cors'); // prevent communication blocks
const app = express(); // initialise the server
const PORT = 3001; // the port to expose the backend on

// Use the body parser to read the body of HTTP requests
app.use(bodyParser.json());
// Enable CORS for all routes
app.use(cors());

// Returns all the products
app.get('/api/getAllProducts', async (req, res) => {
  try {
    const allProducts = await getAllProducts();
    res.status(200).json(allProducts.products);
  } catch (error) {
    res.status(500).json({message: 'Could not retrieve products'});
  }
});

// Returns the results of a search
app.get('/api/searchProducts', async (req, res) => {
  const query = req.query.query;

  try {
    const productsFound = await searchProducts(query);
    res.status(200).json(productsFound.products);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Could not search for product'});
  }
});

// Adds a product and returns the result
app.post('/api/addProduct', async (req, res) => {
  const productData = req.body;

  try {
    const addedProduct = await addProduct(productData);
    res.status(200).json(addedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Could not add product'});
  }
});


// Deletes a product and returns the result
app.delete('/api/deleteProduct/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const returnedProduct = await deleteProduct(id);
    res.status(200).json(returnedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Could not delete product'});
  }
});

// Updates a product and returns the result
app.patch('/api/updateProduct/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const productData = req.body;

  try {
    const updatedProduct = await updateProduct(id, productData);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Could not update product'});
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`API backend started on port ${PORT}`);
});
