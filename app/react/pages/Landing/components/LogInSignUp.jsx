import React from 'react';
import { Button, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';

const SubscriptionButtons = (props) => {
  return (
    <div className="well login-signup">
      <Button
        bsStyle="primary"
        bsSize="large"
        onClick={() => props.onSignUpClick()}
        block>
          Create an Account
     </Button>

      <Button
        bsStyle="info"
        bsSize="large"
        onClick={() => props.onLogInClick()}
        block>
          Log In
     </Button>
    </div>
  );
};

const SignUp = (props) => {
  return (
    <div className="well login-signup">
      <Form horizontal>
        <FormGroup controlId="loginName">
          <Col componentClass={ControlLabel} sm={2}>
            Name
          </Col>
          <Col sm={10}>
            <FormControl placeholder="Full Name" />
          </Col>
        </FormGroup>

        <FormGroup controlId="loginEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl type="email" placeholder="your@email.com" />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit">
              Create Account
            </Button>

            <span className="subscription-tip">
              already have an account? <a href="#" onClick={() => props.onLogInClick()}>Log in</a>
            </span>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

const LogIn = (props) => {
  return (
    <div className="well login-signup">
      <Form horizontal>
        <FormGroup controlId="signUpEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl type="email" placeholder="your@email.com" />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit">
              Log In
            </Button>

            <span className="subscription-tip">
              new user? <a href="#" onClick={() => props.onSignUpClick()}>Create an account</a>
            </span>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

// Top level class, the only component exported by this module.
//
// It controls the interaction and manages states as the user navigates on the
// different forms of this component. Possible states this component can be:
//
// - `welcome`: the initial state, where two buttons (log-in and sign-up) are
//   displayed, and the user has to choose one of them
// - `login`: the LogIn form. The user's email is requested. The user can also
//   choose to sign up at this step
// - `signup`: the SignUp form. The user's name and email are requested, and
//   a new account is created if the data provided is correct.
//
class LogInSignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      option: 'welcome'
    };
  }

  chooseOption(option) {
    this.setState({
      option: option
    });
  }

  render() {
    switch (this.state.option) {
      case 'welcome':
        return <SubscriptionButtons
                 onLogInClick={() => this.chooseOption('login')}
                 onSignUpClick={() => this.chooseOption('signup')}
               />
      case 'login':
        return <LogIn onSignUpClick={() => this.chooseOption('signup')} />;
      case 'signup':
        return <SignUp onLogInClick={() => this.chooseOption('login')} />;
    }
  }
}

export default LogInSignUp;
