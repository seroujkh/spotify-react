import React, { useContext, useEffect } from "react";
import Loader from "../components/Layout/Loader";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";
const AccessToken = props => {

    const ctx = useContext(AuthContext);
    let history = useHistory();

    useEffect(() => {
        const linkHashArray = window.location.hash.substring(1).split('&').reduce(function (initial, item) {
            if (item) {
                var parts = item.split('=');
                initial[parts[0]] = decodeURIComponent(parts[1]);
            }
            return initial;
        }, {});

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