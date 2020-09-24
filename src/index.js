import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import AuthProvider from './hooks/AuthProvider';
import Home from './pages/Home';

const App = () => {
  return (
    <Fragment>
      <StatusBar backgroundColor='#111619' />
      <AuthProvider>
        <Home />
      </AuthProvider>
    </Fragment>
  );
}

export default App;
