import { Container, Typography, Box } from '@mui/material';
import React from 'react';

function Navbar() {
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
      <Typography variant="p">
        Alveshop
      </Typography>
      {
        // user logado, info user se nao chamada para entrar
      }
      <Box>
        Matheus alves
        coins: 250
      </Box>
    </Container>
  );
}

export default Navbar;
