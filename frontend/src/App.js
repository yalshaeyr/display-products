// App.js
import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import { Rating } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Make a GET request to the '/api/products' endpoint
    fetch('/api/getAllProducts')
      .then((res) => res.json())
      .then((data) => {
        // Set the products state with the response data
        setProducts(data);
      })
      .catch((err) => {
        console.log('Error fetching products:', err);
      });
  }, []);

  // Update a specified product
  const updateProduct = (updatedProduct) => {
    setProducts((prevState) => {
      return prevState.map((product) => (product.id === updatedProduct.id ? updatedProduct : product));
    });
  };


  

  // Placeholder functions for handling button clicks
  const handleAddProduct = () => {
    console.log('Add product button clicked');
  };

  const handleEditProduct = async (productId) => {
    const productDataToUpdate = {
        title: 'Fizz Sweet',
        price: 123,
        rating: 4.5,
        thumbnail: 'https://2.bp.blogspot.com/-VIZEN1ElulE/VS2j_910CTI/AAAAAAAAoU8/GCfso28ZVcE/s1600/Fizz_7.jpg',
      };

    fetch(`/api/updateProduct/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productDataToUpdate),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((updatedProduct) => {
          // Call the updateProduct function to update the state with the updated product
          updateProduct(updatedProduct);
        })
        .catch((error) => {
          console.error('Error updating product:', error);
        });
  }

  const handleDeleteProduct = (productId) => {
    fetch(`/api/deleteProduct/${productId}`, {
        method: 'DELETE',
      })
    .then((response) => {
        console.log(response);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
    })
    .catch((error) => {
        console.error(`Error deleting product ID ${productId}:`, error);
    });

  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Products
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddProduct}>
            Add Product
          </Button>
        </Box>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card>
                <CardActionArea>
                  <CardMedia component="img" height="140" image={product.thumbnail} alt={product.title} />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ${product.price}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Rating value={product.rating} precision={0.1} readOnly />
                    </Box>
                    <Box sx={{ mt: 1 }}>
                      <IconButton
                        color="primary"
                        aria-label="edit product"
                        onClick={() => handleEditProduct(product.id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        aria-label="delete product"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}


  

  

export default App;
