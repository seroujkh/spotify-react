import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../../store/auth-context";
import PropTypes from 'prop-types';

const LightMode = (props) => {

    const [lightMode, setMode] = useState(props.mode);
    const ctx = useContext(AuthContext);


    useEffect(() => {
        setMode(props.mode);
    }, [props.mode]);

    const toggleLightModeHandler = () => {
        if (lightMode === 'light') {
            setMode("dark");
            ctx.setLightMode("dark");
        } else {
            ctx.setLightMode("light");
            setMode("light");
        }
    }

    return (
        <div className="lightmode d-flex justify-content-between px-3 mt-4" onClick={toggleLightModeHandler}>
            <span className="text-white">Light</span>
            <div className="toggle_light ">
                <div className={(lightMode === 'dark' ? ' right ' : ' left ')}></div>
            </div>
            <span className="text-white">Dark</span>
            <div className="active d-none"  data-testid="active">{lightMode}</div>
        </div>
    )
}

LightMode.propTypes = {
    mode: PropTypes.string.isRequired
}
export default LightMode;