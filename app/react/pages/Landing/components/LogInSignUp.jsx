import React from 'react';
import { Button } from 'react-bootstrap';

const LogInSignUp = (props) => {
  return (
    <div className="well login-signup">
      <Button bsStyle="primary" bsSize="large" block>Create an Account</Button>
      <Button bsStyle="info" bsSize="large" block>Log In</Button>
    </div>
  );
}

export default LogInSignUp;
