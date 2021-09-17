import { useHistory } from 'react-router-dom';
const NotFound = props => {

    let history = useHistory();
    return (
        <div className="container py-5 ">
            <div className="row">
                <div className="col-lg-12 artist-albums">
                    <h2>Not found  </h2>
                    <hr></hr>
                    <h4><b>Navigate</b></h4>
                    <ul>
                        <li onClick={
                            () => {
                                history.replace("/artists/")
                            }
                        } className="link pointer text-black" >
                            Artists
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NotFound;