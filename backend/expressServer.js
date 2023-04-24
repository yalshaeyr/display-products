const { 
    getAllProducts, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    searchProducts } = require('./productManager.js');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;

app.use(bodyParser.json());

// Define the '/api/getAllProducts' endpoint that returns a JSON response
app.get('/api/getAllProducts', async (req, res) => {
    try{
        const allProducts = await getAllProducts();
        res.status(200).json(allProducts.products);
    }
    catch (error) {
        res.status(500).json({ message: 'Could not retrieve products' });
    }
});

app.get('/api/searchProducts', async (req, res) => {
    const query = req.query.query;
    
    try {
        const productsFound = await searchProducts(query);
        res.status(200).json(productsFound.products);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Could not search for product' });
      }
});

app.post('/api/addProduct', async (req, res) => {
    const productData = req.body;

    try {
      const addedProduct = await addProduct(productData);
      res.status(200).json(addedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Could not add product' });
    }
});


// Delete endpoint
app.delete('/api/deleteProduct/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const returnedProduct = await deleteProduct(id);
        res.status(200).json(returnedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Could not delete product'})
    }

});

// Update endpoint 
app.patch('/api/updateProduct/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const productData = req.body;
  
    try {
      const updatedProduct = await updateProduct(id, productData);
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Could not update product' });
    }
});
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
