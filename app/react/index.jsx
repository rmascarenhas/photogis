import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Main from './components/Main';
import MainApp from './pages/MainApp';

// The Index is the entry point of the front-end application.
// It basically declares the application routes, which are handled
// by `react-router`. Depending on the URL on the browser, the correct
// compoenent is rendered.
const Index = () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Main} />
      <Route path="/app" component={MainApp} />
    </Router>
  );
};

ReactDOM.render(
  <Index />,
  document.getElementById('container')
);
