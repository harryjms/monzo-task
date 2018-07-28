//@flow
import CookieJar from '../Utils/CookieJar.js';

const apiURL = 'https://guarded-thicket-22918.herokuapp.com';
const jwt = CookieJar.getCookie('authToken');

export interface ErrorObject { error: string }

export const get = (url: string): Promise<Object> => {
    return new Promise((resolve, reject) =>
        fetch(apiURL + url, {
            method: 'GET',
            headers: {
                ...(jwt && { Authorization: jwt }),
            },
        })
            .then(res => {
                if (res.status === 200) {
                    resolve(res);
                } else {
                    reject(res);
                }
            })
            .catch(reject),
    );
};

export const post = (url: string, body: Object): Promise<Object> => {
    return new Promise((resolve, reject) =>
        fetch(apiURL + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then(res => {
                if (res.status === 200) {
                    resolve(res);
                } else {
                    reject(res);
                }
            })
            .catch(reject),
    );
};
