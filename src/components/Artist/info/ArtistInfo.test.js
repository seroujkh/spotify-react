import { shallow, mount } from 'enzyme';
import React from 'react';
import { render, screen } from '@testing-library/react';
import ArtistInfo from './ArtistInfo';

const MOCK_ARTIST = {
    "external_urls": {
        "spotify": "https://open.spotify.com/artist/28hJdGN1Awf7u3ifk2lVkg"
    },
    "followers": {
        "href": null,
        "total": 747449
    },
    "genres": [
        "alternative metal",
        "death metal",
        "groove metal",
        "hard rock",
        "metal",
        "old school thrash",
        "rock",
        "thrash metal"
    ],
    "href": "https://api.spotify.com/v1/artists/28hJdGN1Awf7u3ifk2lVkg",
    "id": "28hJdGN1Awf7u3ifk2lVkg",
    "images": [
        {
            "height": 640,
            "url": "https://i.scdn.co/image/ab6761610000e5ebb42315840a0dd1ddda0e82ab",
            "width": 640
        },
        {
            "height": 320,
            "url": "https://i.scdn.co/image/ab67616100005174b42315840a0dd1ddda0e82ab",
            "width": 320
        },
        {
            "height": 160,
            "url": "https://i.scdn.co/image/ab6761610000f178b42315840a0dd1ddda0e82ab",
            "width": 160
        }
    ],
    "name": "Testament",
    "popularity": 56,
    "type": "artist",
    "uri": "spotify:artist:28hJdGN1Awf7u3ifk2lVkg"
}

describe('Artist Info', () => {
    beforeEach(() => render(<ArtistInfo artist={MOCK_ARTIST} />));

    test('should render artist image', () => {
        const image = screen.getByRole("img");
        expect(image).toHaveAttribute('src', MOCK_ARTIST.images[0].url);
    });

    test('should render artist name', () => {
        const name = screen.getByTestId("artist-name");
        expect(name).toHaveTextContent(MOCK_ARTIST.name);
    });

    test('should render artist follower number', () => {
        const artistFollowers = screen.getByTestId("artist-followers");
        expect(artistFollowers).toHaveTextContent(MOCK_ARTIST.followers.total);
    });

    // test('should render artist star ratings', () => {
    //     // let wrapper = render(<RouterWrapper><ArtistItem artist={MOCK_ARTIST} /></RouterWrapper>);
    //     // const stars = screen.getByTestId("star-ratings");
    //     expect(screen.containsMatchingElement(<StarRatings
    //         rating={MOCK_ARTIST.popularity * 0.05}
    //         starRatedColor="#1DB954"
    //         numberOfStars={5}
    //         name='rating'
    //         starDimension="25px"
    //         starSpacing="1px"
    //     />)).toEqual(true);
    // });


});
