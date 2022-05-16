import { Button, Container, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import productsDataContext from '../context/Context';
import requestApi from '../utils/api';

function Register({ backSignIn }) {
  const [dataCadastro, setDataCadastro] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { setAlertGlobal } = useContext(productsDataContext);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setDataCadastro({
      ...dataCadastro,
      [name]: value,
    });
  };

  const handleCadastrar = async () => {
    const response = await requestApi('/user', 'POST', dataCadastro);
    if (!response.idUser) {
      setAlertGlobal({
        open: true,
        severity: 'error',
        value: response.message,
      });
      return;
    }
    setAlertGlobal({
      open: true,
      severity: 'success',
      value: response.message,
    });
    backSignIn();
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
      <h2>Cadastro</h2>
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

Register.propTypes = {
  backSignIn: PropTypes.func.isRequired,
};

export default Register;
