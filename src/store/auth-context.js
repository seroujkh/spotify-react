import React, { useState, useEffect } from 'react';
import { getCookie, changeLightModeTo, getUserProfile } from '../services/services';
import { useHistory } from 'react-router';

const AuthContext = React.createContext({
  isLoggedIn: false,
  accessToken: null,
  user: null,
  lightmode: null,
  onLogout: () => { },
  onLogin: (token) => { },
  setLightMode: (state) => { },
  loading: null,
  errorMssg: null,
  setErrorMssg: (msg) => { }
});


export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState([]);
  const [lightMode, setLightMode] = useState("light");
  const [loading, setLoading] = useState(true);
  const [errorMssg, setErrorMssg] = useState("");

  let history = useHistory();
  const getUser = async (token) => {
    const response = await getUserProfile(token);
    if (response.name) {
      setUser(response);
      setLoading(false);
    } else {
      if (response.error.message) setErrorMssg(response.error.message);
      else setErrorMssg(JSON.stringify(response));
      logoutHandler();
      setTimeout(() => { history.replace('/login'); }, 500)
    }
  }

  useEffect(() => {
    let cookieValue = getCookie("token");
    if (cookieValue !== "") {
      setIsLoggedIn(true);
      setAccessToken(cookieValue);
      getUser(cookieValue);
    }

    let currentLightMode = localStorage.getItem("lightmode");
    if (currentLightMode === null) {
      localStorage.setItem("lightmode", "light");
      setLightMode("light");
    } else {
      if (currentLightMode === 'dark') document.querySelector("body").classList.add("dark");
      setLightMode(currentLightMode);
    }
  }, []);


  const setLightModeHandle = (state) => {
    setLightMode(state);
    changeLightModeTo(state);
  }

  const logoutHandler = () => {
    document.cookie = "token=null";
    setIsLoggedIn(false);
    setAccessToken(null);
    setUser(null);
  };


  const loginHandler = (token) => {
    setIsLoggedIn(true);
    var now = new Date();
    now.setTime(now.getTime() + 1 * 3600 * 1000);
    document.cookie = "token=" + token + "; expires=" + now.toUTCString() + "; path=/";
    setAccessToken(token);
    getUser(token);
  };

  const ErrorMssgHandler = (msg) => {
    setErrorMssg(msg);
    logoutHandler();

  }



  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        accessToken: accessToken,
        user: user,
        loading: loading,
        lightmode: lightMode,
        setLightMode: setLightModeHandle,
        errorMssg: errorMssg,
        setErrorMssg: ErrorMssgHandler
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;