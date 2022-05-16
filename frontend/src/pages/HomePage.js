import { Container } from '@mui/material';
import React, { useContext } from 'react';
import productsDataContext from '../context/Context';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

function HomePage() {
  const { products } = useContext(productsDataContext);

  return (
    <>
      <SearchBar />
      <Container
        sx={ {
          mt: 2,
          display: 'flex',
          flexFlow: 'wrap row',
        } }
      >
        {
          products && products.map((product) => (
            <ProductCard itemProduct={ product } key={ product.id } />
          ))
        }
      </Container>
    </>
  );
}

export default HomePage;
