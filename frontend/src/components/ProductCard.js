import { Box, Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import ModalGeneric from './ModalGeneric';
import CardConfirmationBuy from './CardConfirmationBuy';
import storage from '../utils/storage';
import productsDataContext from '../context/Context';

function ProductCard({ itemProduct }) {
  const [modalIsOpenBuy, setModalIsOpenBuy] = useState(false);
  const { setAlertGlobal } = useContext(productsDataContext);

  const handleClickSale = () => {
    const token = storage.get('user');
    if (!token) {
      setAlertGlobal({
        open: true,
        severity: 'info',
        value: 'Por favor faço o login para comprar algo.' });
      return;
    }
    setModalIsOpenBuy(true);
  };

  return (
    <Box
      sx={ {
        width: '20%',
        padding: '10px',
        height: '390px',
      } }
    >
      <ModalGeneric
        sx={ { padding: '10px', height: '420px' } }
        stateForOpen={ [modalIsOpenBuy, setModalIsOpenBuy] }
      >
        <CardConfirmationBuy
          closeModel={ () => setModalIsOpenBuy(false) }
          itemProduct={ itemProduct }
        />
      </ModalGeneric>
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
          onClick={ handleClickSale }
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
