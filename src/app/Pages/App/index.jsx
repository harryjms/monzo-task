//@flow
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'react-jss';
import { theme } from '../../Theme/index';
import Login from '../Login/index.jsx';
import store from '../../Store/index.js';

class App extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Login />
                </ThemeProvider>
            </Provider>
        );
    }
}

export default App;
