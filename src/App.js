import './assets/css/main.css';
import './assets/css/bootstrap.min.css';
import './assets/fonts/stylesheet.css';

import React, { useContext, useEffect, useState } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';

import Login from './pages/Login';
import Artists from './pages/Artists';
import NotFound from './pages/NotFound';
import ArtistSingle from './pages/ArtistSingle';

import AuthContext from './store/auth-context';
import AcessToken from './pages/AccessToken';
import AnimatedSwitchComponent from './components/Layout/AnimatedSwitchComponent';

function App() {
  const ctx = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState();
  
  useEffect(() => {
    setIsLoggedIn(ctx.isLoggedIn);
  }, [ctx]);


  if (!isLoggedIn) {
    return (
      <AnimatedSwitchComponent>

        <Route path='/' exact>
          <Redirect to='/login' />
        </Route>

        <Route path='/login' exact>
          <Login />
        </Route>

        <Route exact path="/:access_token" render={() => (<AcessToken />)} />
        
        <Route path="*">
          <NotFound />
        </Route>

      </AnimatedSwitchComponent>
    )
  } else {
    return (
      <AnimatedSwitchComponent >
        <Route path='/' exact>
          <Redirect to='/artists' />
        </Route>
        <Route path='/artists' exact>
          <Artists />
        </Route>
        <Route path='/artist/:aristId' exact  >
          <ArtistSingle />
        </Route>
        <Route path='/login' exact>
          <Redirect to='/artists' />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </AnimatedSwitchComponent>
    )
  }
}

export default App;
