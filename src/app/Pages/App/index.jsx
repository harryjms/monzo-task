//@flow
import React from 'react';
import { ThemeProvider } from 'react-jss';
import { theme } from '../../Theme/index';
import Login from '../Login/index.jsx';
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
        );
    }
}

export default App;
