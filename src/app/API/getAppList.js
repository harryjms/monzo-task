//@flow
import { get, ErrorObject } from './_requestMethods';

export interface AppObject {
    id: string;
    name: string;
    created: string;
    logo: string;
}

export type AppList = () => Promise<Array<?AppObject> | ErrorObject>;
const appList: AppList = () =>
    new Promise((resolve, reject) =>
        get('/apps')
            .then(res => resolve(res.json()))
            .catch(reject),
    );

export { appList };
