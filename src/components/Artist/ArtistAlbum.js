import React from 'react';
const ArtistAlbum = props => {
    const album = props.album;
    let artistNames = "";
    for (let i = 0; i < album?.artists.length; i++) {
        artistNames += album?.artists[i].name + " ";
    }
    if (album == null) return ( <> </>);
    return (
        <div className="col-lg-4 col-md-6 mt-5 ">
            <div className="album-single position-relative mt-3 d-flex position-relative flex-column h-100">
                <div className="album-img">
                    <img src={album?.images[0].url} className='absolute-image-cover' alt="" />
                </div>
                <div className=" px-3 pt-3 flex-grow-1">
                    <h5 className="mb-0">{album?.name}</h5>
                    <p className='text-secondary my-0'>{artistNames}</p>
                </div>
                <div className="d-flex flex-column ">
                    <p className="text-secondary mt-1 mb-0 px-3">{album?.release_date}</p>
                    <p className="text-secondary my-0 px-3 ">{album?.total_tracks + " tracks"}</p>
                    <a href={album?.external_urls.spotify} rel="noreferrer" target="_blank" className="py-3 mt-2">
                        Preview on Spotify
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ArtistAlbum;