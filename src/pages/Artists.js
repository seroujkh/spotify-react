import SearchBar from '../components/SearchBar.js/SearchBar';
import React, { useContext, useState, useEffect } from 'react';
import ArtistItem from '../components/Artist/ArtistItem';
import AuthContext from '../store/auth-context';
import Layout from '../components/Layout/Layout';
import BackToTopBtn from '../components/Layout/BackToTopBtn';
import Loader from '../components/Layout/Loader';
import { fetchArtists, useDebounce } from '../services/services';

const Artists = props => {

    const ctx = useContext(AuthContext);
    const [artists, setArtists] = useState();
    const [searchTerm, setSearchTerm] = useState('...');
    const [loading, setLoading] = useState(ctx.loading);
    let input, response;

    useEffect(() => {
        if (ctx.searchedTerm === null) setSearchTerm("...");
        else setSearchTerm(ctx.searchedTerm);
        if (ctx.searchedResults === null) setArtists([])
        else setArtists(ctx.searchedResults);
    }, [ctx.searchedTerm, ctx.searchedResults]);

    useEffect(() => {
        setLoading(ctx.loading);
    }, [ctx.loading])


    const debouncedSearchTerm = useDebounce(searchTerm, 250);

    useEffect(async () => {
        if (debouncedSearchTerm && searchTerm !== '...') {
            response = await fetchArtists(searchTerm, ctx.accessToken);
            if (response === undefined) {
                ctx.setErrorMssg("Login");
            } else if (response !== undefined && response.artists.items) {
                // setArtists(response.artists.items);
                ctx.setSearchedResults(response.artists.items);
            } else {
                if (response.error.message) ctx.setErrorMssg(response.error.message);
                else ctx.setErrorMssg(JSON.stringify(response));
            }
        }
    }, [debouncedSearchTerm]);

    const onTextChangeHandler = (e) => {
        input = e.target.value;
        if (input.trim() !== '') {
            ctx.setSearchedTerm(input);
        } else {
            ctx.setSearchedTerm("...");
            ctx.setSearchedResults([]);
        }
    }

    return (
        <Layout>
            <Loader loading={loading} />
            <BackToTopBtn />
            <div className='bg-light  h-100vh artist-search-page  '>
                <SearchBar onTextChangeHandler={onTextChangeHandler} value={searchTerm} />
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