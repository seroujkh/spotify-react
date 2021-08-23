import logo from '../assets/icons/logo.png';
import arrow from '../assets/icons/arrowdown.svg';
import React, { useRef, useEffect, useContext  } from 'react';
import Constants from '../store/Constants';
import { useHistory } from 'react-router-dom';
import AuthContext from '../store/auth-context';
const Login = props => {
    const loginSection = useRef(null);
    const goDown = () => window.innerWidth <= 1024 ? loginSection.current.scrollIntoView() : null;
    const ctx = useContext(AuthContext);

    let history = useHistory();
    const {isLoggedIn} = ctx;

    useEffect(() => {
        var myUrl = new URL(window.location.href.replace(/#/g, "?"));
        var param_value = myUrl.searchParams.get("access_token");
        
        if (param_value) {
            history.replace("/artists");
            setTimeout( function(){
                ctx.onLogin(param_value);
              }, 500 );
            console.log(param_value);
        }
    }, [isLoggedIn]);



    const loginHandler = (event) => {
        event.preventDefault();
        let url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(Constants.SPOTIFY.clientId);
        url += '&scope=' + encodeURIComponent('user-read-private user-read-email');

        if (  window.location.hostname === 'localhost') {
            url += '&redirect_uri=http://localhost:3000/login';
        }else  {
            url += "&redirect_uri=https://seroujkh.github.io/login";
        }
        window.location = url;
    };


    return (
        <div className="bg-light d-flex h-100vh justify-content-center align-items-center ">
            <div className='container-fluid h-100'>
                <div className='row justify-content-center align-items-center h-100'>
                    <div className='col-xl-9 col-lg-10 h-100'>
                        <div className='row  align-items-center login-box-wrapper'>
                            <div onClick={goDown} className=' cursor-md-pointer col-lg-6 bg-green d-flex flex-column align-items-center justify-content-center login-box-single '>
                                <img src={logo} className='logo' />
                                <h1 className='text-white text-center pt-5'>SEARCH YOUR ARITSTS</h1>
                                <img src={arrow} className="arrow-down d-lg-none " />
                            </div>
                            <div ref={loginSection} id='loginbtn' className=' col-lg-6 bg-white d-flex flex-column align-items-center justify-content-center login-box-single'>
                                <h3 className='afterline-small'>Welcome Back</h3>
                                <a className=" custom-btn custom-btn-black" allow-hover='yes' onClick={loginHandler}>
                                    Login with Spotify
                                    <img src={logo} className='btn-icon-right' />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;