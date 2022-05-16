import { Container, Typography, Box, Button } from '@mui/material';
import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import productsDataContext from '../context/Context';
import storage from '../utils/storage';

function Navbar() {
  const userInfo = storage.get('user');
  const { coinsUser } = useContext(productsDataContext);
  const history = useHistory();
  const location = useLocation();

  const handleClickExit = () => {
    storage.remove('user');
    history.replace('/login');
  };

  const buttonExit = () => (
    <Button
      onClick={ () => history.replace('/login') }
    >
      Fazer o login

    </Button>
  );

  const infoUserLogged = () => (
    <Box>
      <p>
        {userInfo.name}
      </p>
      <p style={ { color: 'yellow' } }>
        {`Coins: ${coinsUser}`}
      </p>
    </Box>);

  return (
    <Container
      sx={ {
        alignItems: 'center',
        display: 'flex',
        height: '60px',
        justifyContent: 'space-around',
        flexDirection: 'row',
      } }
    >
      <Typography sx={ { fontSize: '28px' } } variant="h1">
        Alveshop
      </Typography>
      {
        userInfo
          ? infoUserLogged()
          : (!location.pathname.includes('login') && buttonExit())
      }
      {userInfo && <Button onClick={ handleClickExit }>Sair</Button>}
    </Container>
  );
}

export default Navbar;
