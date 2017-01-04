import React from 'react';
import ReactDOM from 'react-dom';

import Landing from './pages/Landing';

// entry point of the front-end application. Render a landing page
// which, after log-in or sign-up, will take the user to the main
// app
ReactDOM.render(
  <Landing />,
  document.getElementById('container')
);
