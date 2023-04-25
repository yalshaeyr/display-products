// App.js

// import use states
import React, {useEffect, useState} from 'react';
// UI elements
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  TextField,
  Typography,
  Box,
  Button,
  IconButton,
  InputBase,
  Paper,
  Rating,
} from '@mui/material';
// Icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
// css
import './App.css';

/**
 * Generates the React App
 *
 * @return {HTML} The HTML for the Products webpage.
 */
function App() {
  // the backend host name
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';
  /* useStates for various important data structures */
  // the list of products being displayed
  const [products, setProducts] = useState([]);
  // the product currently being edited
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  // the new product data
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    rating: '',
    thumbnail: '',
  });
  // a marker for whether the add product form is open
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);

  // Load all the products upon startup/refresh
  useEffect(() => {
    // Make a GET request to the '/api/products' endpoint
    fetch(`${BACKEND_URL}/api/getAllProducts`)
        .then((res) => res.json())
        .then((data) => {
        // Set the products state with the response data
          setProducts(data);
        })
        .catch((err) => {
          console.log('Error fetching products:', err);
        }); // eslint-disable-next-line
  }, []);

  // Handles the search event
  const handleSearch = (event, query) => {
    // don't reload or else you will get all the products
    event.preventDefault();
    query = encodeURIComponent(query);
    fetch(`${BACKEND_URL}/api/searchProducts?query=${query}`)
        .then((res) => res.json())
        .then((data) => {
        // Set the products state with the response data
          setProducts(data);
        })
        .catch((err) => {
          console.log('Error fetching products:', err);
        });
  };

  // Update a specified product
  const updateProduct = (updatedProduct) => {
    setProducts((prevState) => {
      return prevState.map((product) =>
        (product.id === updatedProduct.id ? updatedProduct : product));
    });
  };

  // Respond to the add product button
  const handleAddProduct = () => {
    setIsAddProductDialogOpen(true);
  };

  // Ensure the new product is valid
  const validateNewProduct = () => {
    const validatedProduct = {
      title: newProduct.title !== '' ? newProduct.title : 'Default Title',
      price: newProduct.price !== '' ? newProduct.price : 0,
      rating: newProduct.rating !== '' ? newProduct.rating : 0,
      thumbnail: newProduct.thumbnail !== '' ? newProduct.thumbnail : 'https://i0.wp.com/bane-tech.com/wp-content/uploads/2015/10/A.png?ssl=1',
    };

    return validatedProduct;
  };

  // Responds to actually adding a new product
  const handleAddProductConfirm = () => {
    // validate the new product set by the useState
    const validatedProduct = validateNewProduct();

    // Add the product
    fetch(`${BACKEND_URL}/api/addProduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedProduct),
    })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        }) // set the new product if the response is successful
        .then((newProduct) => {
          setProducts((prevState) => [...prevState, newProduct]);
        })
        .catch((error) => {
          console.error('Error updating product:', error);
        });

    // reset the newProduct data
    handleAddProductCancel();
  };

  // Resets the newProduct data and closes the form
  const handleAddProductCancel = () => {
    setIsAddProductDialogOpen(false);
    setNewProduct({
      title: '',
      price: '',
      rating: '',
      thumbnail: '',
    });
  };

  // Communicates with the backend to confirm an edit
  const handleEditProduct = async (productId, productData) => {
    // Send a HTTP PATCH to update the product
    fetch(`${BACKEND_URL}/api/updateProduct/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((updatedProduct) => {
          // Update the product if successful
          updateProduct(updatedProduct);
        })
        .catch((error) => {
          console.error('Error updating product:', error);
        });
  };

  // Responds to selecting the delete icon
  const handleDeleteProduct = (productId) => {
    // Send a HTTP DELETE to delete the product
    fetch(`${BACKEND_URL}/api/deleteProduct/${productId}`, {
      method: 'DELETE',
    })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          } // remove the id that was deleted
          const updatedProducts = products.filter((product) =>
            product.id !== productId);
          setProducts(updatedProducts);
        })
        .catch((error) => {
          console.error(`Error deleting product ID ${productId}:`, error);
        });
  };

  // Responds to selecting the edit icon
  const startEditingProduct = (productId, title, price) => {
    // set the variables
    setEditingProductId(productId);
    setEditedTitle(title);
    setEditedPrice(price);
  };

  // Responds to confirming the edit
  const confirmEditProduct = () => {
    handleEditProduct(editingProductId,
        {title: editedTitle, price: editedPrice});
    setEditingProductId(null);
  };

  // Responds to cancelling an edit
  const cancelEditProduct = () => {
    // Reset the variables
    setEditingProductId(null);
    setEditedTitle('');
    setEditedPrice('');
  };


  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          my: 4,
        }}>
        <Paper
          component="form"
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: '25px',
            padding: '0 8px',
            backgroundColor: '#f1f3f4',
          }}>
          <InputBase
            id="search-input"
            placeholder="Search…"
            inputProps={{'aria-label': 'search'}}
            sx={{flex: 1, ml: 1}}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleSearch(event, event.target.value);
              }
            }}
          />
          <IconButton type="submit" sx={{p: '10px'}} aria-label="search"
            onClick= {(event) => {
              const input = document.getElementById('search-input');
              handleSearch(event, input.value);
            }}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      <Box sx={{my: 4}}>
        <Typography variant="h4" component="h1" gutterBottom>
          Products
        </Typography>
        <Box sx={{mb: 2}}>
          <Button variant="contained" color="primary"
            startIcon={<AddIcon />} onClick={handleAddProduct}>
            Add Product
          </Button>
        </Box>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card>
                <CardActionArea>
                  <CardMedia component="img" height="140"
                    image={product.thumbnail} alt={product.title} />
                  <CardContent>
                    {editingProductId === product.id ? (
                      <>
                        <Box sx={{mt: 1}}>
                          <TextField
                            label="Title"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            size="small"
                          />
                        </Box>
                        <Box sx={{mt: 1}}>
                          <TextField
                            label="Price"
                            type="number"
                            value={editedPrice}
                            onChange={(e) => setEditedPrice(e.target.value)}
                            size="small"
                          />
                        </Box>
                        <Box sx={{mt: 1}}>
                          <Stack direction="row" spacing={1}>
                            <Button variant="contained" color="primary"
                              onClick={confirmEditProduct}>
                                Confirm
                            </Button>
                            <Button variant="outlined" color="secondary"
                              onClick={cancelEditProduct}>
                            Cancel
                            </Button>
                          </Stack>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Typography gutterBottom variant="h6" component="div">
                          {product.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Price: ${product.price}
                        </Typography>
                        <Box sx={{mt: 1}}>
                          <Rating value={product.rating}
                            precision={0.1} readOnly />
                        </Box>
                        <Box sx={{mt: 1}}>
                          <IconButton
                            color="primary"
                            aria-label="edit product"
                            onClick={() => startEditingProduct(product.id,
                                product.title, product.price)}
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
                      </>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Dialog
        open={isAddProductDialogOpen}
        onClose={handleAddProductCancel}
        aria-labelledby="add-product-dialog-title">
        <DialogTitle id="add-product-dialog-title">Add Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            variant="standard"
            onChange={(e) => setNewProduct({...newProduct,
              title: e.target.value})}
          />
          <TextField
            margin="dense"
            id="price"
            label="Price"
            fullWidth
            variant="standard"
            onChange={(e) => setNewProduct({...newProduct,
              price: e.target.value})}
          />
          <TextField
            margin="dense"
            id="rating"
            label="Rating"
            fullWidth
            variant="standard"
            onChange={(e) => setNewProduct({...newProduct,
              rating: e.target.value})}
          />
          <TextField
            margin="dense"
            id="thumbnail"
            label="Thumbnail URL"
            fullWidth
            variant="standard"
            onChange={(e) => setNewProduct({...newProduct,
              thumbnail: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddProductCancel} color="primary">
          Cancel
          </Button>
          <Button onClick={handleAddProductConfirm} color="primary">
          Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}


export default App;
