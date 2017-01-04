import React from 'react';
import { PageHeader } from 'react-bootstrap';

import Navigation from './components/Navigation';
import LogInSignUp from './components/LogInSignUp';

require('./styles.css');

// Landing Page: What the user sees if she is not yet logged
// into the app. Displays two buttons to either log-in (for
// existing users) or subscribe.
const Landing = (props) => {
  return (
    <div id="app">
      <Navigation />
      <PageHeader>PhotoGIS <small>Share your photos on a map</small></PageHeader>

      <LogInSignUp />
    </div>
  );
};

export default Landing;
