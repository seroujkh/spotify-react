import logo from '../../assets/icons/logo.png';
import { useState, useEffect } from 'react';
const Loader = props => {

    const [loading,setLoading] = useState(props.loading);

    useEffect( () => {
        setLoading(props.loading);
    },[props.loading])

    return (
        <div className={"loader d-flex align-items-center justify-content-center " + (loading ? '' : ' hide ')}>
            <img src={logo} className='logo'  alt=""  />
        </div>
    )
}

export default Loader;