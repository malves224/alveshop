import { Card, Container, Button } from '@mui/material';
import React, { useState } from 'react';
import SignIn from '../components/SignIn';

function Login() {
  const [signingUp, setSigningUp] = useState(false);

  return (
    <Container
      sx={ {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh)',
        width: '100%',
      } }
    >
      <Card
        sx={ {
          display: 'flex',
          flexDirection: 'column',
          width: '30%',
          padding: '10px',
        } }
      >
        {signingUp
          ? (<div>register</div>)
          : (<SignIn />) }
        <Button
          onClick={ () => setSigningUp(!signingUp) }
          variant="text"
        >
          {signingUp ? 'Voltar' : 'Cadastar'}
        </Button>

      </Card>
    </Container>
  );
}

export default Login;
