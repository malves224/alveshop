import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import productsDataContext from './Context';
import requestApi from '../utils/api';
import storage from '../utils/storage';

const INITIAL_STATE_PRODUCTS = [{
  id: '',
  active: '',
  name: '',
  urlImage: '',
  price: '',
}];

function DataProvider({ children }) {
  const [products, setProducts] = useState(INITIAL_STATE_PRODUCTS);
  const [alertGlobal, setAlertGlobal] = useState({
    value: '', severity: 'error', open: false,
  });
  const [coinsUser, setCoinsUser] = useState(0);

  const setOpenAlert = (bool) => {
    setAlertGlobal({
      ...alertGlobal,
      open: bool,
    });
  };

  useEffect(() => {
    const userData = storage.get('user');

    requestApi('/product', 'GET')
      .then((res) => setProducts(res));

    if (userData) {
      requestApi(`/wallet/${userData.id}`, 'GET', undefined, userData.token)
        .then((res) => setCoinsUser(res.coins));
    }
    return () => {
      setProducts(INITIAL_STATE_PRODUCTS);
    };
  }, []);

  const valueProps = useMemo(() => ({
    products,
    setProducts,
    setAlertGlobal,
    coinsUser,
    setCoinsUser,
    alertGlobal,
    setOpenAlert,
  }), [products, setOpenAlert]);

  return (
    <productsDataContext.Provider
      value={ valueProps }
    >
      { children }
    </productsDataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataProvider;
