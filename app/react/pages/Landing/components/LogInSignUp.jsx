import React from 'react';
import { Button } from 'react-bootstrap';

import LogIn from './LogIn';
import SignUp from './SignUp';

const SubscriptionButtons = (props) => {
  return (
    <div className="well login-signup">
      <Button
        bsStyle="primary"
        bsSize="large"
        onClick={props.onSignUpClick}
        block>
          Create an Account
     </Button>

      <Button
        bsStyle="info"
        bsSize="large"
        onClick={props.onLogInClick}
        block>
          Log In
     </Button>
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
        return <LogIn
                 onSignUpClick={() => this.chooseOption('signup')}
                 onSubmit={(email) => this.handleLogIn(email)}
               />;
      case 'signup':
        return <SignUp onLogInClick={() => this.chooseOption('login')} />;
    }
  }
}

export default LogInSignUp;
