import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import productsDataContext from './Context';
import requestApi from '../utils/api';

const INITIAL_STATE_PRODUCTS = [{
  id: '',
  active: '',
  name: '',
  urlImage: '',
  price: '',
}];

function DataProvider({ children }) {
  const [products, setProducts] = useState(INITIAL_STATE_PRODUCTS);

  useEffect(() => {
    requestApi('/product', 'GET')
      .then((res) => setProducts(res));

    return () => {
      setProducts(INITIAL_STATE_PRODUCTS);
    };
  }, []);

  const valueProps = useMemo(() => ({
    products,
    setProducts,
  }), [products]);

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
