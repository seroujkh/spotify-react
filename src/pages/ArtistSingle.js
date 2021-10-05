import { useParams, useHistory } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';

import AuthContext from '../store/auth-context';
import ArrowLeft from '../components/ArrowLeft';
import StarRatings from 'react-star-ratings';
import ArtistAlbum from '../components/Artist/Album/ArtistAlbum';
import Loader from '../components/Layout/Loader';
import BackToTopBtn from '../components/Layout/BackToTopBtn';
import Layout from '../components/Layout/Layout';
import { fetchArtists, getScrollY, fetchAritstAlbums } from '../services/services';
import ArtistInfo from '../components/Artist/info/ArtistInfo';

const ArtistSingle = props => {

    const params = useParams();
    const ctx = useContext(AuthContext);
    let h = useHistory();

    const [albums, setAlbums] = useState([]);
    const [artist, setArtist] = useState();
    const [paginate, setPaginate] = useState(false);
    const [apiLink, setApiLink] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getArtist() {
        const artist = await fetchArtists(params.aristId, ctx.accessToken);
        if ((artist.artists.items.length == 0) || (params.aristId.toLowerCase() !== artist.artists.items[0].name.replace(/\s/g, '-').toLowerCase())) {
            h.replace('/not-found');
        } else if (artist.artists.items[0]) {
            setArtist(artist.artists.items[0]);
            setApiLink("https://api.spotify.com/v1/artists/" + artist.artists.items[0].id + "/albums?limit=40");
            setPaginate(true);
            // console.log(artist.artists.items[0])

        } else {
            //error log user out with message
            ctx.setErrorMssg(JSON.stringify(artist));
        }
    }

    useEffect(async () => {
        await getArtist();
        window.addEventListener('scroll', () => { listenToScroll() });
        return () => {
            window.removeEventListener('scroll', () => { listenToScroll() })
        }
    }, []);

    const listenToScroll = () => {
        if (getScrollY() >= 0.5) {
            window.removeEventListener('scroll', () => { listenToScroll() })
            setPaginate(true);
        }
    }

    useEffect(async () => {
        if (paginate && (apiLink !== null)) {
            const response = await fetchAritstAlbums(apiLink, ctx.accessToken);
            if (response.items) {
                setAlbums(albums.concat(response.items));
                setApiLink(response.next);
                setPaginate(false);
                setLoading(false);
                if (response.next) {
                    window.addEventListener('scroll', () => { listenToScroll() });
                }
            } else {
                if (response.error.message) ctx.setErrorMssg(response.error.message);
                else ctx.setErrorMssg(JSON.stringify(response));
            }
        }
    }, [paginate]);

    return (
        <Layout>

            <div className="bg-light  h-100vh single-artist-page ">
                <div className="container py-5 ">
                    <Loader loading={loading} />
                    <div className="d-flex align-items-center hovergreen cursor-pointer " onClick={() => h.replace('/artists/')}>
                        <ArrowLeft />
                        <h4 className="mb-0"> Go Back</h4>
                    </div>
                    <div className="row pb-5">
                        <ArtistInfo artist={artist} />
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
                    </div>
                </div>
                <BackToTopBtn />
            </div>
        </Layout>
    )
}

export default ArtistSingle;