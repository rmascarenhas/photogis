import React from 'react';
import { Navbar } from 'react-bootstrap';

const Navigation = (props) => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">PhotoGIS</a>
        </Navbar.Brand>
      </Navbar.Header>
    </Navbar>
  );
}

export default Navigation;
