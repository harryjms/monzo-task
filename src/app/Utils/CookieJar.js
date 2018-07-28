//@flow
import moment from 'moment';

const setCookie = (key: string, value: any, expires: string = ''): void => {
    if (expires) {
        expires = `expires=${moment(expires).format(
            'ddd, D MMM YYYY HH:mm:ss z',
        )};`;
    }

    document.cookie = `${key}=${value}; ${expires}path=/;`;
};

const getCookie = (key: string): any => {
    const jar = decodeURIComponent(document.cookie);
    const cookie = key + '=';
    const found = jar.split(';').filter(c => c.indexOf(cookie) === 0)[0];
    if (found) {
        return found.substr(cookie.length, found.length);
    } else {
        return;
    }
};

const deleteCookie = (key: string): void => {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export default { setCookie, getCookie, deleteCookie };
