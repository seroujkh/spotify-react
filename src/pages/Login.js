import logo from '../assets/icons/logo.png';
import arrow from '../assets/icons/arrowdown.svg';
import React, { useRef, useContext } from 'react';
import { login } from '../services/services';
import AuthContext from '../store/auth-context';
import { useEffect, useState } from 'react/cjs/react.development';

const Login = props => {

    const ctx = useContext(AuthContext);
    const loginSection = useRef(null);
    const goDown = () => window.innerWidth <= 1024 ? loginSection.current.scrollIntoView() : null;
    const [showError, setShowError] = useState(false);
    const [errorMssg, setErrorMssg] = useState(ctx.errorMssg);

    const loginHandler = (event) => {
        event.preventDefault();
        login();
    };
    useEffect(() => {
        if (ctx.errorMssg !== "") {
            setShowError(true);
            setErrorMssg(ctx.errorMssg);
        }
    }, [ctx]);

    const closeHandler = () => {
        setShowError(false);
    }
    return (
        <>
            <div className="bg-light d-flex h-100vh justify-content-center align-items-center ">
                <div className='container-fluid h-100'>
                    <div className='row justify-content-center align-items-center h-100'>
                        <div className='col-xl-9 col-lg-10 h-100'>
                            <div className='row  align-items-center login-box-wrapper'>
                                <div onClick={goDown} className=' cursor-md-pointer col-lg-6 bg-green d-flex flex-column align-items-center justify-content-center login-box-single '>
                                    <img src={logo} className='logo' alt="" />
                                    <h1 className='text-white text-center pt-5'>SEARCH YOUR ARITSTS</h1>
                                    <img src={arrow} className="arrow-down d-lg-none " alt="" />
                                </div>
                                <div ref={loginSection} id='loginbtn' className=' col-lg-6 bg-white d-flex flex-column align-items-center justify-content-center login-box-single'>
                                    <h3 className='afterline-small'>Welcome Back</h3>
                                    <a href="#" className=" custom-btn custom-btn-black" allow-hover='yes' onClick={loginHandler}>
                                        Login with Spotify
                                        <img src={logo} className='btn-icon-right' alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"error-box " + (showError ? " show " : '')}>
                <div className="black-shadow"
                    onClick={closeHandler}
                ></div>
                <div className="error-msg">
                    <svg onClick={closeHandler} fill="#fff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 511.76 511.76">
                        <g>
                            <g>
                                <path fill="#fff" d="M436.896,74.869c-99.84-99.819-262.208-99.819-362.048,0c-99.797,99.819-99.797,262.229,0,362.048
			c49.92,49.899,115.477,74.837,181.035,74.837s131.093-24.939,181.013-74.837C536.715,337.099,536.715,174.688,436.896,74.869z
			 M361.461,331.317c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251
			l-75.413-75.435l-75.392,75.413c-4.181,4.16-9.643,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251
			c-8.341-8.341-8.341-21.845,0-30.165l75.392-75.413l-75.413-75.413c-8.341-8.341-8.341-21.845,0-30.165
			c8.32-8.341,21.824-8.341,30.165,0l75.413,75.413l75.413-75.413c8.341-8.341,21.824-8.341,30.165,0
			c8.341,8.32,8.341,21.824,0,30.165l-75.413,75.413L361.461,331.317z"/>
                            </g>
                        </g>

                    </svg>

                    {errorMssg}
                </div>
            </div>
        </>
    )
}

export default Login;