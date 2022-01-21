import { mockData } from './mock-data';
import axios from 'axios';
import NProgress from 'nprogress';

export const extractLocations = (events) => {
    var extractLocations = events.map((event) => event.location);
    var locations = [...new Set(extractLocations)];
    return locations;
};

export const extractEvents = (events) => {
    var extractEvents = events.map((event) => event);
    return extractEvents
}

const removeQuery = () => {
    if (window.history.pushState && window.location.pathname) {
        var newurl =
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname;
        window.history.pushState("", "", newurl);
    } else {
        newurl = window.location.protocol + "//" + window.location.host;
        window.history.pushState("", "", newurl);
    }
};

/*
const checkToken = async (accessToken) => {
    const result = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    )
        .then((res) => res.json())
        .catch((error) => error.json());

    return result;
};
*/

const checkToken = async (accessToken) => {
    try{
        const result = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`);
        return await result.json();
    }catch(error){
        error.json();
    } 
};

/*
const getToken = async (code) => {
    const encodeCode = encodeURIComponent(code);
    const { access_token } = await fetch(
        // eslint-disable-next-line no-useless-concat
        'https://zlk2czbshb.execute-api.eu-central-1.amazonaws.com/dev/api/token' + '/' + encodeCode
        )
        .then((res) => {
            return res.json();
        })
        .catch((error) => error);
    
    access_token && localStorage.setItem("access_token", access_token);
    return access_token;
};
*/

const getToken = async (code) => {
    try {
        const encodeCode = encodeURIComponent(code);
        const { access_token } = await fetch(
            // eslint-disable-next-line no-useless-concat
            'https://zlk2czbshb.execute-api.eu-central-1.amazonaws.com/dev/api/token' + '/' + encodeCode);
        access_token && localStorage.setItem("access_token", access_token);
        return access_token.json();
    } catch (error) {
        error.json();
    }
}


/*
const getToken = async (code) => {
    const encodeCode = encodeURIComponent(code);
    const { response } = await fetch('https://zlk2czbshb.execute-api.eu-central-1.amazonaws.com/dev/api/token' + '/' + encodeCode)
    const access_token = await response.json();
    access_token && localStorage.setItem("access_token", access_token);
    return access_token;
};
*/

export const getAccessToken = async () => {
    const accessToken = localStorage.getItem('access_token');
    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || tokenCheck.error) {
        await localStorage.removeItem("access_token");
        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get("code");
        if (!code) {
            const results = await axios.get(
                "https://zlk2czbshb.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
            );
            const { authUrl } = results.data;
            return (window.location.href = authUrl);
        }
        return code && getToken(code);
    }
    return accessToken;
}

export const getEvents = async () => {
    NProgress.start();

    if (window.location.href.startsWith('http://localhost')) {
        NProgress.done();    
        return mockData;
    }

    const token = await getAccessToken();
    if (token) {
        removeQuery();
        // eslint-disable-next-line no-useless-concat
        const url = 'https://zlk2czbshb.execute-api.eu-central-1.amazonaws.com/dev/api/get-events' + '/' + token;
        const result = await axios.get(url);
        if (result.data) {
            var locations = extractLocations(result.data.events);
            localStorage.setItem("lastEvents", JSON.stringify(result.data));
            localStorage.setItem("locations", JSON.stringify(locations));
        }
        NProgress.done();
        return result.data.events;
    }
}
