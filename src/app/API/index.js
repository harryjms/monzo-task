//@flowx
import { appList } from './getAppList';
import type { AppList } from './getAppList';
import { appUsers } from './getAppUsers';
import type { AppUsers } from './getAppUsers';
import { saveDetails } from './saveDetails';
import type { SaveDetails } from './saveDetails';
import authenticated from './authenticated';
import type { Authenticated } from './authenticated';
import login from './login';
import type { Login } from './login';

interface MonzoAPI {
    appList: AppList;
    appUsers: AppUsers;
    authenticated: Authenticated;
    login: Login;
    saveDetails: SaveDetails;
}

const api = {
    appList,
    appUsers,
    authenticated,
    login,
    saveDetails,
};

export default api;
