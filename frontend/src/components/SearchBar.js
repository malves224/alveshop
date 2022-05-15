import { Button, Container, IconButton, InputBase, Paper, Slider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useContext, useState } from 'react';
import productsDataContext from '../context/Context';
import requestApi from '../utils/api';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const { setProducts } = useContext(productsDataContext);
  const [priceRange, setPriceRange] = useState([1, 100]);
  const handleChangeRange = ({ target }) => {
    const { value } = target;
    if (!value[0]) {
      return setPriceRange([1, value[1]]);
    }
    setPriceRange(value);
  };

  const handleSubmitSearch = () => {
    const [greaterThan, lessThan] = priceRange;
    const paramsEndpoint = `/product/?priceGreaterThan=${greaterThan}`
    + `&priceLessThan=${lessThan}&name=${searchTerm}`;
    requestApi(paramsEndpoint, 'GET')
      .then((res) => setProducts(res));
  };

  const handleChange = ({ target }) => {
    setSearchTerm(target.value);
    if (!target.value) {
      handleSubmitSearch();
    }
  };
  return (
    <Container
      sx={ {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
      } }
    >
      <Paper
        sx={ { p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 } }
      >
        <InputBase
          sx={ { ml: 1, flex: 1 } }
          onChange={ handleChange }
          placeholder="Pesquise o que você quer..."
          onKeyDown={ ({ code }) => code.includes('Enter') && handleSubmitSearch() }
          inputProps={ { 'aria-label': 'search' } }
        />
        <IconButton
          onClick={ handleSubmitSearch }
          type="button"
          sx={ { p: '10px' } }
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <Container
        sx={ {
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
        } }
      >
        <p>Preço:</p>
        <Container
          sx={ {
            width: '90%',
            display: 'flex',
            alignItems: 'center',
            padding: '0 5px',
          } }
        >
          {priceRange[0]}
          <Slider
            sx={ { width: '40%', margin: '0 10px' } }
            getAriaLabel={ () => 'priceRange' }
            value={ priceRange }
            onChange={ handleChangeRange }
            valueLabelDisplay="auto"
          />
          {priceRange[1]}
          <Button
            sx={ { margin: '0 5px' } }
            size="small"
            color="success"
            variant="contained"
            onClick={ handleSubmitSearch }
          >
            Aplicar

          </Button>
        </Container>
      </Container>
    </Container>
  );
}

export default SearchBar;
