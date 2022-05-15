import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, HomePage } from './pages';

function App() {
  return (
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
  );
}

export default App;
