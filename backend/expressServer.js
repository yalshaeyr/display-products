// server.js
const express = require('express');
const app = express();
const PORT = 3001;

// Define the '/api/products' endpoint that returns a JSON response
app.get('/api/products', (req, res) => {
  const products = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
  ];

  res.json(products);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
