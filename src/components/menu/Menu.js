import React, { useContext, useState } from "react";
import AuthContext from '../../store/auth-context';

import { useHistory } from "react-router-dom";
import Burger from "./Burger";
const SidebarMenu = props => {
    const [menuOpen, setMenuOpen] = useState(false);
    const ctx = useContext(AuthContext);
    const [lightMode,setLightMode]= useState(ctx.lightmode);
    let history = useHistory();
    const toggleLightMode = () => {
        if (lightMode==='light') {
            setLightMode("dark");
            ctx.setLightMode("dark");
        }else {
            ctx.setLightMode("light");
            setLightMode("light");
        }
    }

    return (
        <>
            <Burger open={menuOpen} toggleClick={() => { setMenuOpen(!menuOpen) }} />
            <div className={" side_menu text-center d-flex flex-column " + (menuOpen ? " open " : '')}>
                <div className="profile-icon-wrapper mt-md-5 mt-3 mx-auto ">
                    <div className="profile-icon">
                        <img className="absolute-image-cover" src={ctx.user?.icon}  alt="" />
                    </div>
                </div>
                <h6 className="text-white mt-4 mb-3">{ctx.user?.name}</h6>
                <p className="text-white my-0">{ctx.user?.followers?.total + " followers"} </p>
                <p className="text-white ">{"Country : " + ctx.user?.country} </p>
                <div className="custom-btn custom-btn-green" onClick={()=>{ctx.onLogout(); history.replace('/spotify-artist/login')}}>
                    Logout
                </div>
                <div className="lightmode d-flex justify-content-between px-3 mt-4" onClick={toggleLightMode}>
                    <span className="text-white">Light</span>
                    <div className="toggle_light ">
                        <div className={(lightMode==='dark'? ' right ' : ' left ')}></div>
                    </div>
                    <span  className="text-white">Dark</span>
                </div>
            </div>
        </>
    )
}

export default SidebarMenu;