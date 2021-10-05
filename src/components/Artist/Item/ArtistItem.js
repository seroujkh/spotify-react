import StarRatings from 'react-star-ratings';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';


const ArtistItem = props => {
    const artist = props.artist;
    // console.log(artist)
    return (
        <div className="col-lg-4 col-md-6   pt-3">
            <NavLink data-testid="artist-link" to={"/artist/" + artist.name.replace(/\s/g, '-').toLowerCase()} className="single-artist-item pt-3 d-flex position-relative flex-column" >
                <div className="artist-img">
                    <img src={artist.images[0]?.url} className='absolute-image-cover' alt="" />
                </div>
                <div className="artist-info" >
                    <h2 className="text-white" data-testid="artist-name">{artist.name}</h2>
                    <p className="text-white mb-2" data-testid="artist-followers">{artist.followers?.total} <span className="text-white"> followers</span> </p>
                    <div >
                        <StarRatings
                            data-testid="star-ratings"
                            rating={artist.popularity * 0.05}
                            starRatedColor="#1DB954"
                            numberOfStars={5}
                            name='rating'
                            starDimension="25px"
                            starSpacing="1px"
                        />
                    </div>
                </div>
            </NavLink>
        </div>
    )
}
ArtistItem.propTypes = {
    artist: PropTypes.object.isRequired,
}
export default ArtistItem;