import { shallow, mount } from 'enzyme';
import React from 'react';
import ArtistAlbum from './ArtistAlbum';
import { render, screen } from '@testing-library/react';

const MOCK_ALBUM = {
    "album_group": "album",
    "album_type": "album",
    "artists": [
        {
            "external_urls": {
                "spotify": "https://open.spotify.com/artist/28hJdGN1Awf7u3ifk2lVkg"
            },
            "href": "https://api.spotify.com/v1/artists/28hJdGN1Awf7u3ifk2lVkg",
            "id": "28hJdGN1Awf7u3ifk2lVkg",
            "name": "Testament",
            "type": "artist",
            "uri": "spotify:artist:28hJdGN1Awf7u3ifk2lVkg"
        }
    ],
    "external_urls": {
        "spotify": "https://open.spotify.com/album/63dZKnLfVsHItoygbM7IJK"
    },
    "href": "https://api.spotify.com/v1/albums/63dZKnLfVsHItoygbM7IJK",
    "id": "63dZKnLfVsHItoygbM7IJK",
    "images": [
        {
            "height": 640,
            "url": "https://i.scdn.co/image/ab67616d0000b273683bc85e4435f02fb7fade6d",
            "width": 640
        },
        {
            "height": 300,
            "url": "https://i.scdn.co/image/ab67616d00001e02683bc85e4435f02fb7fade6d",
            "width": 300
        },
        {
            "height": 64,
            "url": "https://i.scdn.co/image/ab67616d00004851683bc85e4435f02fb7fade6d",
            "width": 64
        }
    ],
    "name": "Titans of Creation",
    "release_date": "2020-04-03",
    "release_date_precision": "day",
    "total_tracks": 12,
    "type": "album",
    "uri": "spotify:album:63dZKnLfVsHItoygbM7IJK"
}
describe('ArtistAlbum', () => {
    let wrapper;

    beforeEach(() => wrapper = shallow(<ArtistAlbum album={MOCK_ALBUM} />));

    it('should render correctly', () => expect(wrapper).toMatchSnapshot());

    it('should render 5 <div />', () => {
        expect(wrapper.find('div').length).toEqual(5);
    });

});

describe('Artist Album', () => {

    beforeEach(() => render(<ArtistAlbum album={MOCK_ALBUM} />));

    test('should render album image', () => {
        const image = screen.getByRole("img");
        expect(image).toHaveAttribute('src', MOCK_ALBUM.images[0].url);
    });

    test('should render album artist names', () => {
        const album = MOCK_ALBUM;
        let artistNames = "";
        for (let i = 0; i < album?.artists?.length; i++) {
            let append = ", ";
            if (i === (album?.artists?.length - 1)) append = "";
            artistNames += album?.artists[i].name + append;
        }
        const content = screen.getByTestId("artist-names");
        expect(content).toHaveTextContent(artistNames);
    });

    test('should render album name', () => {
        const name = screen.getByTestId("artist-name");
        expect(name).toHaveTextContent(MOCK_ALBUM.name);
    });

    test('should render album release date', () => {
        const releaseDate = screen.getByTestId("release-date");
        expect(releaseDate).toHaveTextContent(MOCK_ALBUM.release_date);
    });

    test('should render album total tracks', () => {
        const totalTracks = screen.getByTestId("total-tracks");
        expect(totalTracks).toHaveTextContent(MOCK_ALBUM.total_tracks + " tracks");
    });

    test('should render album preview link', () => {
        const previewLink = screen.getByRole("link");
        expect(previewLink).toHaveAttribute("href", MOCK_ALBUM.external_urls.spotify);
    });

});