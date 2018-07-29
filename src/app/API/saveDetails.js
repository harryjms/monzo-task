//@flow
import { put, ErrorObject } from './_requestMethods';
import type { AppUserObject } from './getAppUsers.js';

type SaveDetailKeys = 'name' | 'logo';

interface SaveDetailsObject {
    name?: string;
    logo?: string;
}

export type SaveDetails = (
    appId: string,
    updates: SaveDetailsObject,
) => Promise<Array<?AppUserObject> | ErrorObject>;

const saveDetails: SaveDetails = (appId, updates) => {
    return new Promise((resolve, reject) =>
        put(`/apps/${appId}`, updates)
            .then(res => {
                resolve(res.json());
            })
            .catch(reject),
    );
};

export { saveDetails };
