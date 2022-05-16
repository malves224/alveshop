import { Button, Container, TextField } from '@mui/material';
import React, { useState } from 'react';

function Register() {
  const [dataCadastro, setDataCadastro] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setDataCadastro({
      ...dataCadastro,
      [name]: value,
    });
  };

  const handleCadastrar = async () => {
    console.log('cadastrar usuario');
  };

  return (
    <Container
      sx={ {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: '400px',
      } }
    >
      <TextField
        onChange={ handleChange }
        onCopy={ handleChange }
        value={ dataCadastro.name }
        type="text"
        label="Nome:"
        name="name"
        variant="outlined"
        size="small"
      />
      <TextField
        onChange={ handleChange }
        type="text"
        value={ dataCadastro.email }
        label="Email:"
        name="email"
        variant="outlined"
        size="small"
      />
      <TextField
        onChange={ handleChange }
        type="password"
        label="Senha"
        name="password"
        variant="outlined"
        size="small"
      />
      <Button
        onClick={ handleCadastrar }
        variant="contained"
      >
        Cadastrar
      </Button>
    </Container>
  );
}

export default Register;
