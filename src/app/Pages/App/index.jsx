//@flow
import React from 'react';
import { ThemeProvider } from 'react-jss';
import { theme } from '../../Theme/index';
import Login from '../Login/index.jsx';

class App extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Login />
      </ThemeProvider>
    );
  }
}

export default App;
