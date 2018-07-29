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
    var name = key + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
};

const deleteCookie = (key: string): void => {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export default { setCookie, getCookie, deleteCookie };
