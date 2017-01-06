import React from 'react';
import { Nav, NavItem, Navbar, Button } from 'react-bootstrap';

import Authentication from '../../../services/Authentication';

// Main app navigation bar.
//
// Includes a greeting for the currently logged in user, as well as
// the log-out button
class Navigation extends React.Component {
  constructor() {
    super();

    this.authentication = new Authentication();
    this.logOut = this.logOut.bind(this);
  }

  // logs out from the application. First, remove user data from the browser
  // session, and then redirects the user to the application landing page
  logOut() {
    this.authentication.logOut();
    this.context.router.push('/');
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <span className="logo">PhotoGIS</span>
            <small className="app-greeting">Welcome, {this.authentication.currentUser().name}</small>
          </Navbar.Brand>
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              <Button bsStyle="warning" onClick={this.logOut}>Logout</Button>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Navigation.contextTypes = {
  router: React.PropTypes.object
};

export default Navigation;
