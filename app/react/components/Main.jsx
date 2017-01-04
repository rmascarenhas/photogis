import React from 'react';
import Authentication from '../services/Authentication';

import Landing from '../pages/Landing';
import MainApp from '../pages/MainApp';

// Main component: rendered at the root (/) of the application.
// Its behaviour depends on whether or not the user is already authenticated:
//
// * unauthenticated users:
// Renders a landing page which, after log-in or sign-up, will take the user to the main
// photo assigning app
//
// * authenticated users:
// Renders the main application directly, where users can upload photos on the map.
class Main extends React.Component {
  constructor() {
    super();

    this.authentication = new Authentication();
  }

  render() {
    if (this.authentication.isLoggedIn()) {
      return <MainApp />;
    }

    return <Landing />;
  }
}

export default Main;
