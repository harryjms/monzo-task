//@flow
import * as React from 'react';

import { ThemeProvider } from 'react-jss';
import { theme } from '../../Theme/index';
import Login from '../Login/index.jsx';
import CookieJar from '../../Utils/CookieJar';
import AppBar from '../../Components/AppBar/index.jsx';
import AppList from '../AppList/index.jsx';
import AppDetails from '../AppDetails/index.jsx';

interface AppState {
    page: React.Element<any>;
}

export type ChangePageFunc = (page: string, params?: Object) => void;

class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.authToken = CookieJar.getCookie('authToken');
        this.state = {
            page: <AppList />,
        };
        this.propInjections = {
            changePage: this._handlePageChange,
        };
    }

    authToken: string;
    propInjections: { changePage: ChangePageFunc };

    _handlePageChange = (page: string, params?: Object): void => {
        let comp: React.Node;
        switch (page) {
            case 'home':
                comp = <AppList />;
                break;
            case 'details':
                comp = <AppDetails appId={params && params.appId} />;
                break;
            default:
                comp = <Login />;
        }
        this.setState({ page: comp });
    };

    render() {
        return (
            <ThemeProvider theme={theme}>
                {this.authToken ? (
                    <React.Fragment>
                        <AppBar changePage={this._handlePageChange} />
                        {React.cloneElement(
                            this.state.page,
                            this.propInjections,
                        )}
                    </React.Fragment>
                ) : (
                    <Login />
                )}
            </ThemeProvider>
        );
    }
}

export default App;
