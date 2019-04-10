import React, { StrictMode } from 'react';
import { render as domRender } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/config';

// eslint-disable-next-line import/extensions
import App from './App.jsx';

const store = configureStore();

domRender(
  (
    <Provider store={store}>
      <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter>
    </Provider>
  ), document.getElementById('root'),
);
