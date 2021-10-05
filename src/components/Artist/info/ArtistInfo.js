import React from "react";
import StarRatings from "react-star-ratings";

const ArtistInfo = props => {

    const artist = props.artist;

    return (
        <div className="col-lg-12 mt-4 artist-albums">
            <div className="row align-items-center ">
                <div className="col-xl-3 col-lg-4">
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
    )
}

export default ArtistInfo;