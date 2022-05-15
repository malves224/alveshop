import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { Login, HomePage } from './pages';
import AlertTogle from './components/AlertTogle';
import productsDataContext from './context/Context';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const { alertGlobal, setOpenAlert } = useContext(productsDataContext);
  const { open, severity } = alertGlobal;

  return (
    <ThemeProvider theme={ darkTheme }>
      <AlertTogle
        severity={ severity }
        switchValue={ [open, setOpenAlert] }
      >
        {alertGlobal.value}
      </AlertTogle>
      <Switch>
        <Route
          exact
          path="/login"
          render={ () => <Login /> }
        />
        <Route
          exact
          path="/"
          render={ () => <HomePage /> }
        />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
