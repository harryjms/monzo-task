//@flow
const apiURL = 'https://guarded-thicket-22918.herokuapp.com';

export const get = (url: string): Promise<Object> => {
    return fetch(apiURL + url);
};

export const post = (url: string, body: Object): Promise<Object> => {
    return fetch(apiURL + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
};
