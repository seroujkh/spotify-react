// import logo from './logo.svg';
import './assets/css/main.css';
import './assets/css/bootstrap.min.css';
import './assets/fonts/stylesheet.css';

import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import Artists from './pages/Artists';
import NotFound from './pages/NotFound';
import ArtistSingle from './pages/ArtistSingle';

import AuthContext from './store/auth-context';

import AnimatedSwitchComponent from './components/Layout/AnimatedSwitchComponent';

function App() {
  const ctx = useContext(AuthContext);

  if (!ctx.isLoggedIn) {
    return (
      <AnimatedSwitchComponent>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route path='*'>
          <Redirect to='/login' />
        </Route>
      </AnimatedSwitchComponent>
    )
  } else {
    return (
      <AnimatedSwitchComponent >
        <Route path='/artists/' exact>
          <Artists />
        </Route>
        <Route path='/artist/:aristId'   >
          <ArtistSingle />
        </Route>
        <Route path='/login' >
          <Redirect to='/artists' />
        </Route>

        <Route path='*'>
          <NotFound />
        </Route>
      </AnimatedSwitchComponent>
    )
  }
}

export default App;
