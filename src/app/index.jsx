//@flow
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Pages/App/index.jsx';

const root = document.getElementById('root');
if (root) {
  ReactDOM.render(<App />, root);
}
