import React, { useState, useEffect }  from 'react';
import ReactReadMoreReadLess from "react-read-more-read-less";
import {Button, Box, Stack, Typography} from '@mui/material'
import Loader from './Loader';

const Navbar = () => {
  const [productCategory, setProductCategory] = useState("");
  const [selectedProductCategory, setSelectedProductCategory] = useState('');
  const [product, setProduct] = useState([]);
 
    useEffect(() => {
     const getProductCategories = async () => {
      const res = await fetch("https://fakestoreapi.com/products/categories");
      const getCategory = await res.json();
      setProductCategory(await getCategory);
     }
     getProductCategories();
    }, []);

    const handleProductCategory = (event) => {
      const getProductCategory = event.target.value;
      setSelectedProductCategory(getProductCategory);
    }
    
    useEffect(() => {
      const getProduct = async () => {
        const resposne = await fetch(`https://fakestoreapi.com/products/category/${selectedProductCategory}`); 
        
        const getProduct = await resposne.json();
        setProduct(await getProduct);
      }
      getProduct();
      
    },[selectedProductCategory]);

  return (
  <>
  <Stack alignItems = "right" mt = "20px" ml = "1000px" justifyContent = "center" p = "20px" spacing={1} direction ="row">
   <Box>
    
      <select
        onChange={(e) => {handleProductCategory(e)}}
      >
        <option>Select category</option>
        {productCategory
          ? productCategory.map((product) => {
            return <option key = {product} value ={product}>{product}</option>
          })
          :null
        }
      </select>
    </Box>
    <Box>
      <select>
        <option>Search products...</option>
        {product
          ? product.map((item) => {
           
              return <option key = {item.id}>{item.title}</option>
            
          })
          : null
        }
      </select>
    
   </Box>
   </Stack>
   
   <Box id = "products" sx = {{ mt: { lg: '50px'}}} mt = "30px" p = "20px">
      <Typography variant = 'h6' mb = "46px">
        Showing products
      </Typography>
      <Stack direction = "row" sx = {{ gap: {lg: '110px', xs: '50px'}}} flexWrap = "wrap" justifyContent = "center">
        {product
          ? product.map((item) => {
           return <div className = 'product-card'> 
           <img src = {item.image} alt = {item.title}/> 
           <Stack direction = "row"></Stack> 
              <Button sx={{ ml: '300px', color: '#fff', background: '#FFA9A9', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
                {item.category}
              </Button>
              <Typography ml="21px" color="#000" fontWeight="bold" sx={{ fontSize: { lg: '10px', xs: '5px' } }} mt="6px" pb="5px" textTransform="capitalize">
                {item.title}
              </Typography>
              <Typography ml="21px" color="#000"  sx={{ fontSize: { lg: '10px', xs: '5px' } }} mt="5px" pb="5px" >
                <ReactReadMoreReadLess
                  charLimit={150}
                  readMoreText={"Read more ▼"}
                  readLessText={"Read less ▲"}
                >
                  {item.description}
                </ReactReadMoreReadLess>
              </Typography>
           </div>
            
         
          })  
          : <Loader/>
        } 
      </Stack>
    </Box>
  </>
  )
}

export default Navbar;