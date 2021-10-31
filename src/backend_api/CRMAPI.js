export const API = process.env.REACT_APP_BACKEND;

console.log(API)
const BASE_URL = `${API}`
const type = 'xyz'
export const httpsGET = (tokens, resourceURL) => {
    return fetch(`${BASE_URL}${resourceURL}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${tokens ? tokens.idToken : ""}`,
            uid: `${tokens ? tokens.uid : ""}`,
            type:`${type}`
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const httpsPOST = (tokens, resourceURL, body) => { 
    return fetch(`${BASE_URL}${resourceURL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${tokens ? tokens.idToken : ""}`,
            uid: `${tokens ? tokens.uid : ""}`,
            type:`${type}`
        },
        body: JSON.stringify(body),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const httpsPATCH = (tokens, resourceURL, body) => { 
    return fetch(`${BASE_URL}${resourceURL}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${tokens ? tokens.idToken : ""}`,
            uid: `${tokens ? tokens.uid : ""}`,
            type:`${type}`
        },
        body: JSON.stringify(body),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const httpsDELETE = (tokens, resourceURL) => {
    return fetch(`${BASE_URL}${resourceURL}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${tokens ? tokens.idToken : ""}`,
            uid: `${tokens ? tokens.uid : ""}`,
            type:`${type}`
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};