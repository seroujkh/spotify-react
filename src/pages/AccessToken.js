import React, { useContext, useEffect } from "react";
import Loader from "../components/Layout/Loader";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { getLinkHashArray } from "../services/services";

const AccessToken = props => {

    const ctx = useContext(AuthContext);
    let history = useHistory();

    useEffect(() => {
        const linkHashArray = getLinkHashArray(window.location.hash);
        let accessToken = linkHashArray['/access_token'];
        if (accessToken) {
            ctx.onLogin(accessToken);
            history.replace('/artists');
        }
    }, []);

    return (
        <Loader loading={true} />
    )

}


export default AccessToken;