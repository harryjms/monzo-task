//@flow
import { get } from './_requestMethods.js';

export type Authenticated = () => Promise<boolean | number | Object>;

export default () =>
    new Promise((resolve, reject) =>
        get('/')
            .then(res => {
                if (res.status === 200) {
                    resolve(true);
                } else {
                    reject(401);
                }
            })
            .catch(reject),
    );
