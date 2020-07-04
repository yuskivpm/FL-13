import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import ConnectedApp from './containers/ConnectedApp';

const App = (
  <Provider store={store}>
    <ConnectedApp />
  </Provider>
);
ReactDOM.render(App, document.getElementById('root'));

