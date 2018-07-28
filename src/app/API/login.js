//@flow
import { post } from './_requestMethods';

export type Login = (email: string, password: string) => Promise<boolean>;
const login: Login = (email, password) =>
    new Promise((resolve, reject) => {
        post('/login', { email, password })
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json());
                } else {
                    reject(res);
                }
            })
            .catch(reject);
    });
export default login;
