import React from 'react';
import { Navbar } from 'react-bootstrap';

import Authentication from '../../../services/Authentication';

// Main app navigation bar.
//
// Includes a greeting for the currently logged in user, as well as
// the log-out button
class Navigation extends React.Component {
  constructor() {
    super();

    this.authentication = new Authentication();
  }

  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <span className="logo">PhotoGIS</span>
            <small className="app-greeting">Welcome, {this.authentication.currentUser().name}</small>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}

export default Navigation;
