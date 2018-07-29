//@flow
import { get, ErrorObject } from './_requestMethods';

export interface AppUserObject {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

export type AppUsers = (
    appID: string,
    page: number,
    perPage: number,
) => Promise<Array<?AppUserObject> | ErrorObject>;

const appUsers: AppUsers = (appID, page = 1, perPage = 10) => {
    const offset = (page - 1) * perPage;
    return new Promise((resolve, reject) =>
        get(`/apps/${appID}/users?limit=${perPage}&offset=${offset}`)
            .then(res => resolve(res.json()))
            .catch(reject),
    );
};

export { appUsers };
