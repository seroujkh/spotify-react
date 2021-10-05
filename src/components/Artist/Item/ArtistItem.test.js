import { shallow, mount } from 'enzyme';
import React from 'react';
import ArtistItem from './ArtistItem';
import StarRatings from 'react-star-ratings';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'


const RouterWrapper = props => {
    return (
        <BrowserRouter>{props.children}</BrowserRouter>
    )
}

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

describe('ArtistItem', () => {
    let wrapper;

    beforeEach(() => wrapper = shallow(<ArtistItem artist={MOCK_ARTIST} />));

    it('should render correctly', () => expect(wrapper).toMatchSnapshot());

    // it('should render a <div />', () => {
    //     expect(wrapper.find('div').length).toEqual(3);
    // });

    it('should render Star Ratings Correctly ', () => {
        expect(wrapper.containsMatchingElement(<StarRatings
            rating={MOCK_ARTIST.popularity * 0.05}
            starRatedColor="#1DB954"
            numberOfStars={5}
            name='rating'
            starDimension="25px"
            starSpacing="1px"
        />)).toEqual(true);
    });

});

describe('Single Artist Item', () => {
    beforeEach(() => render(<RouterWrapper><ArtistItem artist={MOCK_ARTIST} /></RouterWrapper>));

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

    test('should render artist star ratings', () => {


    });

});


describe('Single Artist Link', () => {
    test('should redirect and update history', () => {
        const history = createMemoryHistory();
        let correctLink = "/artist/" + MOCK_ARTIST.name.replace(/\s/g, '-').toLowerCase();

        render(<Router history={history}><ArtistItem artist={MOCK_ARTIST} /></Router>);

        const artistLink = screen.getByTestId("artist-link");
        userEvent.click(artistLink);

        expect(history.location.pathname).toEqual(correctLink);
    });

});