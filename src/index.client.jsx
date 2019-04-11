import React, { StrictMode, Suspense } from 'react';
import { render as domRender } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/config';

import Loader from './components/Loader';

const App = React.lazy(() => import('./App.jsx'));

const store = configureStore();

domRender(
  (
    <Provider store={store}>
      <BrowserRouter>
        <StrictMode>
          <Suspense fallback={<Loader />}>
            <App />
          </Suspense>
        </StrictMode>
      </BrowserRouter>
    </Provider>
  ), document.getElementById('root'),
);
