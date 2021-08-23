import SearchBar from '../components/SearchBar.js/SearchBar';
import React, { useContext, useEffect, useState } from 'react';
import ArtistItem from '../components/Artist/ArtistItem';
import AuthContext from '../store/auth-context';
import Layout from '../components/Layout/Layout';
import BackToTopBtn from '../components/Layout/BackToTopBtn';
import Loader from '../components/Layout/Loader';
const Artists = props => {

    const [artists, setArtists] = useState();

    const [searchTerm, setSearchTerm] = useState('...');
    const ctx = useContext(AuthContext);

    let input, API_URL;
    const { loading } = ctx;


    const onTextChangeHandler = (e) => {
        input = e.target.value;
        if (input.trim() !== '') {
            setSearchTerm(input);
            API_URL = `https://api.spotify.com/v1/search?query=${encodeURIComponent(
                input
            )}&type=artist`;

            fetch(API_URL, {
                headers: {
                    'Authorization': 'Bearer ' + ctx.accessToken
                },
            }).then(response => response.json())
                .then(data => {
                    setArtists(data.artists.items)
                }).catch((error) => {
                    console.log(error);
                });

        } else {
            setSearchTerm('...');
            setArtists([]);
        }
    }

    return (
        <Layout>
            <Loader loading={loading} />
            <BackToTopBtn />
            <div className='bg-light  h-100vh  '>
                <SearchBar onTextChangeHandler={onTextChangeHandler} />
                <div className='container mt-5 pb-5'>
                    <div className='row'>
                        <div className='col-12'>
                            <h3 className='fw-700 '>Search for your favorite artists</h3>
                            <p className='text-secondary'>{'Showing results for ' + searchTerm}</p>
                        </div>
                        {artists?.map(function (artist, i) {
                            return (
                                <ArtistItem key={i.toString()} artist={artist} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Artists;