//@flow
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'react-jss';
import { theme } from '../../Theme/index';
import Login from '../Login/index.jsx';
import store from '../../Store/index.js';
import CookieJar from '../../Utils/CookieJar';
import AppList from '../AppList/index.jsx';
import AppBar from '../../Components/AppBar/index.jsx';

class App extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
        this.authToken = CookieJar.getCookie('authToken');
    }

    authToken: string;

    render() {
        return (
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    {this.authToken ? (
                        <React.Fragment>
                            <AppBar />
                            <AppList />
                        </React.Fragment>
                    ) : (
                        <Login />
                    )}
                </ThemeProvider>
            </Provider>
        );
    }
}

export default App;
