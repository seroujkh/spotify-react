// import logo from './logo.svg';
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

import AnimatedSwitchComponent from './components/Layout/AnimatedSwitchComponent';

function App() {
  const ctx = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState();

  // const { isLoggedIn } = ctx;
  // let history = useHistory();

  useEffect(() => {
    // if (!isLoggedIn) {
    //   history.replace('/spotify-artist/login');
    // }
    setIsLoggedIn(ctx.isLoggedIn);
  }, [ctx]);


  if (!isLoggedIn) {
    return (
      <AnimatedSwitchComponent>
        <Route path='/' exact render={() => { <Redirect to='/spotify-artist/login' /> }} />
        <Route path='/spotify-artist/login' exact component={Login} />
        <Route path="*">
          <NotFound />
        </Route>
      </AnimatedSwitchComponent>
    )
  } else {
    return (
      <AnimatedSwitchComponent >
        <Route path='/' exact>
          <Redirect to='/spotify-artist/artists' />
        </Route>
        <Route path='/spotify-artist/artists' exact>
          <Artists />
        </Route>
        <Route path='/spotify-artist/artist/:aristId' exact  >
          <ArtistSingle />
        </Route>
        <Route path='/spotify-artist/' exact>
          <Redirect to='/spotify-artist/artists' />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </AnimatedSwitchComponent>
    )
  }
}

export default App;
