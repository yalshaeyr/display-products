// App.js
import React, { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Make a GET request to the '/api/products' endpoint
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        // Set the products state with the response data
        setProducts(data);
      })
      .catch(err => {
        console.log('Error fetching products:', err);
      });
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
