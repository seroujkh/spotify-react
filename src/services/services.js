import Constants from "../store/Constants";

import { useState, useEffect } from "react";

export function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
        () => {
            // Update debounced value after delay
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            // Cancel the timeout if value changes (also on delay change or unmount)
            // This is how we prevent debounced value from updating if value is changed ...
            // .. within the delay period. Timeout gets cleared and restarted.
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay] // Only re-call effect if value or delay changes
    );
    return debouncedValue;
}
export function changeLightModeTo(state) {
    if (state === 'dark') {
        localStorage.setItem("lightmode", "dark");
        document.querySelector("body").classList.add("dark");
    } else {
        localStorage.setItem("lightmode", "light");
        document.querySelector("body").classList.remove("dark");
    }
}

export async function fetchArtists(input, accessToken) {
    let API_URL = `https://api.spotify.com/v1/search?query=${encodeURIComponent(input)}&type=artist`;
    const response = await fetch(API_URL, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
    }).then(response => response.json())
        .then(data => {
            // console.log(data);
            if (data.artists.items) {
                return data;
            }
            return data;
        }).catch((error) => {
            return error;
        });
    return response;
}
export function getLinkHashArray(location) {
    const link = location.substring(1).split('&').reduce(function (initial, item) {
        if (item) {
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});
    return link;
}
export async function getUserProfile(accessToken) {
    let API_URL = "	https://api.spotify.com/v1/me";
    const response = await fetch(API_URL, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
    })
        .then(response => response.json())
        .then(data => {
            if (data.display_name) {
                let user = {
                    icon: data.images[0].url,
                    name: data.display_name,
                    country: data.country,
                    followers: data.followers
                }
                return user;
            } else
                return data;

        }).catch((error) => {
            return error
        });
    // console.log(response)
    return response;
}
export async function fetchAritstAlbums(apiLink, accessToken) {
    //get albums with consecutive paginations
    const response = await fetch(apiLink, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
    }).then(response => response.json())
        .then(data => {
            return data;
        }).catch((error) => {
            return error;
        });

    return response;
}

export function getScrollY() {
    const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop
    const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight

    const scrolled = winScroll / height;
    return scrolled;
}

export function login() {
    // spotify implicit login url
    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(Constants.SPOTIFY.clientId);
    url += '&scope=' + encodeURIComponent('user-read-private user-read-email');
    if (window.location.hostname === 'seroujkh.github.io') {
        url += "&redirect_uri=https://seroujkh.github.io/spotify-react";
    } else {
        url += '&redirect_uri=http://localhost:3000';
    }
    window.location = url;
}

export const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}



export async function slugTranslation(name, accessToken) {
    const response = await fetchArtists(name, accessToken);
    return response;
}