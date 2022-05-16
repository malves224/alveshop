import { Container, TextField, Button } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import productsDataContext from '../context/Context';
import requestApi from '../utils/api';
import storage from '../utils/storage';

function SignIn() {
  const [dataLogin, setDataLogin] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { setAlertGlobal } = useContext(productsDataContext);
  const userData = storage.get('user');
  const history = useHistory();

  useEffect(() => {
    if (userData) {
      history.replace('/');
    }
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setDataLogin({
      ...dataLogin,
      [name]: value,
    });
  };

  const handleSignIn = async () => {
    setLoading(true);
    const response = await requestApi('/user/login', 'POST', dataLogin);
    if (response.message) {
      setAlertGlobal({
        open: true,
        severity: 'error',
        value: response.message,
      });
      setLoading(false);
      return;
    }
    storage.set('user', response);
    setLoading(false);
    history.replace('/');
  };

  const { email, password } = dataLogin;

  return (
    <Container
      sx={ {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: '250px',
      } }
    >
      <h1
        style={ {
          textAlign: 'center',
        } }
      >
        Login
      </h1>
      <TextField
        onChange={ handleChange }
        type="text"
        value={ email }
        label="Email"
        name="email"
        variant="outlined"
        size="small"
      />
      <TextField
        onChange={ handleChange }
        type="password"
        value={ password }
        label="Senha"
        name="password"
        variant="outlined"
        size="small"
      />
      <Button
        disabled={ loading }
        onClick={ handleSignIn }
        variant="contained"
      >
        {loading ? 'aguarde..' : 'entrar'}
      </Button>
    </Container>
  );
}

export default SignIn;
