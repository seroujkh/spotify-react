import React, { useState, useEffect } from 'react';
const AuthContext = React.createContext({
  isLoggedIn: false,
  accessToken: null,
  user: null,
  lightmode: null,
  onLogout: () => { },
  onLogin: (token) => { },
  setLightMode: (state) => { },
  loading: null,
});

const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState([]);
  const [lightMode, setLightMode] = useState("light");
  const [loading, setLoading] = useState(true);


  // let h = useHistory();
  const getUser = (token) => {
    let API_URL = "	https://api.spotify.com/v1/me";
    fetch(API_URL, {
      headers: {
        'Authorization': 'Bearer ' + token
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data !== null) {
          let user = {
            icon: data.images[0].url,
            name: data.display_name,
            country: data.country,
            followers: data.followers
          }
          setUser(user);
          setLoading(false);
        }
        console.log(user);

      }).catch((error) => {
        console.log(error);
      });
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
    if (state === 'dark') {
      localStorage.setItem("lightmode", "dark");
      document.querySelector("body").classList.add("dark");
    } else {
      localStorage.setItem("lightmode", "light");
      document.querySelector("body").classList.remove("dark");
    }

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
        setLightMode: setLightModeHandle
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;