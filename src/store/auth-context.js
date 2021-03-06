import React, { useState, useEffect } from 'react';
import { getCookie, changeLightModeTo, getUserProfile } from '../services/services';
import { useHistory } from 'react-router';

const AuthContext = React.createContext({
  isLoggedIn: false,
  accessToken: null,
  user: null,
  lightmode: null,
  searchedTerm: null,
  searchedResults : [],
  setSearchedTerm: () =>  {},
  setSearchedResults: () => {},
  onLogout: () => { },
  onLogin: (token) => { },
  setLightMode: (state) => { },
  loading: null,
  errorMssg: "",
  setErrorMssg: (msg) => { }
});


export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState([]);
  const [lightMode, setLightMode] = useState("light");
  const [loading, setLoading] = useState(true);
  const [errorMssg, setErrorMssg] = useState("");

  //search artists
  const [searchedTerm,setSearchedTerm] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const setSearchedTermHandler = (val)=> setSearchedTerm(val);
  const setSearchedResultsHandler = (val)=> setSearchedResults(val);


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
    setIsLoggedIn(false);
    setAccessToken(null);
    setUser(null); 
    document.cookie = "token=null";
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
        searchedTerm : searchedTerm,
        setSearchedTerm: setSearchedTermHandler,
        setSearchedResults : setSearchedResultsHandler,
        searchedResults : searchedResults,
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