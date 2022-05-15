import { Box, Button } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function ProductCard({ itemProduct }) {
  return (
    <Box
      sx={ {
        width: '20%',
        padding: '10px',
        height: '390px',
      } }
    >
      <img
        alt="imagem do produto"
        width="100%"
        height="209px"
        src={ itemProduct.urlImage }
      />
      <Box
        sx={ {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          height: '40%',
        } }
      >
        <p>
          {itemProduct.name}
        </p>
        <p style={ { color: '#66bb6a' } }>
          <span>Preço: </span>
          {itemProduct.price}
        </p>
        <Button
          color="error"
          variant="contained"
          disabled={ !itemProduct.active }
        >
          {itemProduct.active ? 'Comprar' : 'Indisponivel' }
        </Button>
      </Box>
    </Box>
  );
}

ProductCard.propTypes = {
  itemProduct: PropTypes.shape({
    active: PropTypes.bool,
    urlImage: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
