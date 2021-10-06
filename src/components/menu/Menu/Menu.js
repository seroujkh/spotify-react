import React, { useContext, useState } from "react";
import AuthContext from '../../../store/auth-context';
import { useHistory } from "react-router-dom";
import Burger from "../Burger/Burger";
import LightMode from "../lightmode/LightMode";

const SidebarMenu = props => {
    const [menuOpen, setMenuOpen] = useState(false);
    const ctx = useContext(AuthContext);
    let history = useHistory();

    return (
        <>
            <Burger open={menuOpen} toggleClick={() => { setMenuOpen(!menuOpen) }} />
            <div className={" side_menu text-center d-flex flex-column " + (menuOpen ? " open " : '')}>
                <div className="profile-icon-wrapper mt-md-5 mt-3 mx-auto ">
                    <div className="profile-icon">
                        <img data-testid="user-icon" className="absolute-image-cover" src={ctx.user?.icon} alt="" />
                    </div>
                </div>
                <h6 className="text-white mt-4 mb-3" data-testid="user-name">{ctx.user?.name}</h6>
                <p className="text-white my-0" data-testid="user-followers">{ctx.user?.followers?.total + " followers"} </p>
                <p className="text-white " data-testid="user-country">{"Country : " + ctx.user?.country} </p>
                <div className="custom-btn custom-btn-green" onClick={() => {
                    ctx.onLogout();
                    setTimeout(() => { history.replace('/login'); }, 10);
                }}>
                    Logout
                </div>
                <LightMode mode={ctx.lightmode == null ? "light" : ctx.lightmode} />
            </div>
        </>
    )
}

export default SidebarMenu;