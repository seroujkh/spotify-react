import { shallow, mount } from 'enzyme';
import React from 'react';
import { render, screen } from '@testing-library/react';
import ArtistInfo from './ArtistInfo';

describe('Artist Info', () => {
    beforeEach(() => render(<ArtistItem artist={MOCK_ARTIST} />));

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
