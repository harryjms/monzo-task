//@flowx
import { appList } from './getAppList';
import authenticated from './authenticated';
import type { Authenticated } from './authenticated';
import login from './login';
import type { Login } from './login';

interface MonzoAPI {
    authenticated: Authenticated;
    login: Login;
}

const api = {
    appList,
    authenticated,
    login,
};

export default api;
