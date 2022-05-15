import { Container, TextField, Button } from '@mui/material';
import React, { useState } from 'react';

function SignIn() {
  const [dataLogin, setDataLogin] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setDataLogin({
      ...dataLogin,
      [name]: value,
    });
  };

  const handleSignIn = async () => {
    console.log('signIn');
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
        onClick={ handleSignIn }
        variant="contained"
      >
        Entrar
      </Button>
    </Container>
  );
}

export default SignIn;
