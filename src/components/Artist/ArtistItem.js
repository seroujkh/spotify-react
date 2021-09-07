import StarRatings from 'react-star-ratings';
import { NavLink } from 'react-router-dom';
const ArtistItem = props => {
    const artist = props.artist;
    return (
        <div className="col-lg-4 col-md-6   pt-3">
            <NavLink to={"/artist/" + artist.name.replace(/\s/g, '-').toLowerCase()} className="single-artist-item pt-3 d-flex position-relative flex-column" >
                <div className="artist-img">
                    <img src={artist.images[0]?.url} className='absolute-image-cover' alt="" />
                </div>
                <div className="artist-info">
                    <h2 className="text-white">{artist.name}</h2>
                    <p className="text-white">{artist.followers?.total} <span className="text-white"> followers</span> </p>
                    <StarRatings
                        rating={artist.popularity * 0.05}
                        starRatedColor="#1DB954"
                        numberOfStars={5}
                        name='rating'
                        starDimension="25px"
                        starSpacing="1px"
                    />
                </div>
            </NavLink>
        </div>
    )
}

export default ArtistItem;