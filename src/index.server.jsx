import React from 'react';
import ReactDOMServer from 'react-dom';
import { StaticRouter } from 'react-router-dom';
// eslint-disable-next-line import/extensions
import App from './App.jsx';

export default function (req) {
  const context = {};

  return ReactDOMServer.render((
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  ));
}
