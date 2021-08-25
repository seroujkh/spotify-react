import { NavLink, useParams, useHistory } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';

import AuthContext from '../store/auth-context';
import ArrowLeft from '../components/ArrowLeft';
import StarRatings from 'react-star-ratings';
import ArtistAlbum from '../components/Artist/ArtistAlbum';
import Loader from '../components/Layout/Loader';
import BackToTopBtn from '../components/Layout/BackToTopBtn';

const ArtistSingle = props => {

    const params = useParams();
    const ctx = useContext(AuthContext);

    const [albums, setAlbums] = useState([]);
    const [artist, setArtist] = useState();
    const [paginate, setPaginate] = useState(false);
    const [apiLink, setApiLink] = useState(API_URL);
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);
    const [MainLoading, setMainLoading] = useState(true);

    let h = useHistory();
    let API_URL = "https://api.spotify.com/v1/artists/" + params.aristId + "/albums";


    useEffect(() => {
        // loading of albums and artist
        if (!loading && !loading1) setMainLoading(false);

    }, [loading1, loading]);

    useEffect(() => {
        //get albums with consecutive paginations
        if ((apiLink !== null)) {
            setLoading(true);
            fetch(apiLink, {
                headers: {
                    'Authorization': 'Bearer ' + ctx.accessToken
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        h.replace('/not-found');
                    } else {
                        API_URL = data.next;
                        setLoading(false);
                        setAlbums(albums.concat(data.items));
                        setApiLink(data.next);
                        setPaginate(false);
                        setLoading(false);
                    }
                }).catch((error) => {

                });
        }
    }, [paginate]);


    useEffect(() => {
        // get artist info
        let API_URL2 = "https://api.spotify.com/v1/artists/" + params.aristId;
        fetch(API_URL2, {
            headers: {
                'Authorization': 'Bearer ' + ctx.accessToken
            },
        }).then(response => response.json())
            .then(data => {
                if (data.error) {
                    h.replace('/not-found');
                } else {
                    setLoading1(false);
                    setArtist(data);
                }
            }).catch((error) => {

            });
    }, [])


    return (
        <div className="bg-light  h-100vh">
            <div className="container py-5 ">
                <Loader loading={(MainLoading || loading)} />
                <div className="d-flex align-items-center hovergreen cursor-pointer " onClick={() => h.replace('/artists/')}>
                    <ArrowLeft />
                    <h4 className="mb-0"> Go Back</h4>
                </div>
                <div className="row">
                    <div className="col-lg-12 mt-4 artist-albums">
                        <div className="row align-items-center ">
                            <div className="col-lg-3">
                                <div className="position-relative single-artist-item ">
                                    <div className="artist-img">
                                        <img src={artist?.images[0]?.url} className='absolute-image-cover' alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 artist-details mt-lg-0 mt-4">
                                <h2>
                                    <span className="border-bottom-green">
                                        {artist?.name}
                                    </span>
                                </h2>
                                <p className="mt-5 text-black">{artist?.followers.total + " followers"}</p>
                                <p className=" text-black"><b>Genres : </b>{artist?.genres.toString()}</p>
                                <div className="mt-3">
                                    {artist && <StarRatings
                                        rating={(artist?.popularity * 0.05)}
                                        starRatedColor="#1DB954"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="25px"
                                        starSpacing="1px"
                                    />}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 mt-5">
                        <h3 className='fw-700  '>
                            <span className="border-bottom-green">Albums</span>
                        </h3>
                    </div>
                    {albums?.map(function (album, i) {
                        return (
                            <ArtistAlbum key={i.toString()} album={album} />
                        )
                    })}
                    {apiLink !== null && <div className="col-lg-12 d-flex justify-content-center py-5">
                        <div className="custom-btn custom-btn-green" onClick={() => { setPaginate(true); }}>
                            Load More
                        </div>
                    </div>}
                </div>
            </div>
            <BackToTopBtn />
        </div>
    )
}

export default ArtistSingle;