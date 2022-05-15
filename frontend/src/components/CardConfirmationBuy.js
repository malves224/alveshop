import { Box, Button, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import requestApi from '../utils/api';
import productsDataContext from '../context/Context';
import storage from '../utils/storage';

function CardConfirmationBuy({ itemProduct, closeModel }) {
  const [quantity, setQuantity] = useState(1);
  const { setAlertGlobal, setCoinsUser } = useContext(productsDataContext);

  const handleConfirmation = async () => {
    const user = storage.get('user');
    const endpoint = '/user/sale';
    const payload = { idProduct: itemProduct.id, quantity };
    const response = await requestApi(endpoint, 'POST', payload, user.token);
    if (!response.newBalance) {
      setAlertGlobal({ open: true, severity: 'error', value: response.message });
      return;
    }
    setAlertGlobal({ open: true, severity: 'success', value: response.message });
    setCoinsUser(response.newBalance);
    closeModel();
  };

  const handleAdd = () => {
    const valueToAdd = quantity + 1;
    if (valueToAdd <= 0) {
      setQuantity(1);
      return;
    }
    setQuantity(valueToAdd);
  };

  const handleRemove = () => {
    const valueToAdd = quantity - 1;
    if (valueToAdd <= 0) {
      setQuantity(1);
      return;
    }
    setQuantity(valueToAdd);
  };

  return (
    <>
      <img
        alt="imagem do produto"
        width="100%"
        height="190px"
        src={ itemProduct.urlImage }
      />
      <Box
        sx={ {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '40%',
          paddingTop: '10px',
        } }
      >
        <p>
          {itemProduct.name}
        </p>
        <p style={ { color: '#66bb6a' } }>
          <span>Preço: </span>
          {itemProduct.price}
        </p>
        <p>
          {`Total: ${quantity * itemProduct.price}`}
        </p>
        <Box
          sx={ {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          } }
        >
          <RemoveCircleIcon
            onClick={ handleRemove }
            sx={ {
              cursor: 'pointer',
            } }
          />
          <TextField
            sx={ {
              width: '30%',
            } }
            type="number"
            size="small"
            value={ quantity }
          />
          <AddCircleIcon
            onClick={ handleAdd }
            sx={ {
              cursor: 'pointer',
            } }
          />
        </Box>
        <Button
          color="success"
          sx={ { marginTop: '10px' } }
          variant="contained"
          size="small"
          onClick={ handleConfirmation }
        >
          Confirmar compra
        </Button>
      </Box>
    </>
  );
}

CardConfirmationBuy.propTypes = {
  itemProduct: PropTypes.shape({
    id: PropTypes.number,
    urlImage: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
  }).isRequired,
  closeModel: PropTypes.func.isRequired,
};

export default CardConfirmationBuy;
