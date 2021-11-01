export const API = process.env.REACT_APP_BACKEND;
console.log("API",API)

const BASE_URL = `${API}`

export const httpsGET = (tokens, resourceURL) => {
    console.log("Tokens",tokens)
    return fetch(`${BASE_URL}${resourceURL}`, {
        method: "GET",
        headers: {
            Authorization: `${tokens ? "Bearer "+tokens : null}`,
            uid: `${tokens ? tokens.uid : ""}`
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const httpsPOST = (tokens, resourceURL, body) => {
  return fetch (`${BASE_URL}${resourceURL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `${tokens ? "Bearer "+tokens : ''}`,
      uid: `${tokens ? tokens.uid : ''}`,
    },
    body: JSON.stringify (body),
  })
    .then (response => {
      return response.json ();
    })
    .catch (err => console.log (err));
};


export const httpsPATCH = (tokens, resourceURL, body) => { 
    return fetch(`${BASE_URL}${resourceURL}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `${tokens ? "Bearer "+tokens : ''}`,
            uid: `${tokens ? tokens.uid : ""}`,
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
            Authorization: `${tokens ? "Bearer "+tokens : ''}`,
            uid: `${tokens ? tokens.uid : ""}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};