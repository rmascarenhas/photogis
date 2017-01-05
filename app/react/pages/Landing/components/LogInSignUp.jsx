import React from 'react';
import { Button, Form, FormGroup, FormControl, Col, ControlLabel, HelpBlock } from 'react-bootstrap';

import Authentication from '../../../services/Authentication';

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

// LogIn: this is the log-in form. Only the email is requested. When
// that is provided by the user, an API call is performed to the servers
// (see the `Authentication` component).
//
// If the email belongs to a user previously registered, this component
// redirects the application to the main app (/app). Otherwise, the errors
// are presented in the log-in form.
class LogIn extends React.Component {
  constructor() {
    super();

    this.authentication = new Authentication();
    this.state = {
      email: '',
      error: null
    };

    // these functions are invoked as browser change events. Therefore,
    // they need to be bound to the context of this "class".
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Indicates the form validation state, used to provide some feedback to
  // the user as she fills the log-in form.
  //
  // This is provided by Bootstrap styles and this method generates the
  // validation status label based on the currently value of the email field,
  // accessible via this component state.
  getValidationState() {

    // this is a simple email validation, meant just to enhance the user
    // experience as the email is typed. The final email validation happens
    // at the server side when accounts are created.
    const re = /\S+@\S+\.\S+/;

    if (re.test(this.state.email)) {
      return 'success';
    }

    return 'error';
  }

  getValidationHelp() {
    // If there is no error (no API call performed yet), there is no help
    // message to be shown.
    if (this.state.error === null) {
      return '';
    }

    // translates the possible error codes from the API into human readable
    // messages
    switch (this.state.error) {
      case 'email_not_given':
        return 'Please tell us your email';
      case 'email_invalid':
        return 'This is not a valid email address';
      case 'email_taken':
        return 'This email address is already registered';
      default:
        return 'Something went wrong. Please try again later';
    }
  }

  // update the component state every time there is a change in the
  // email field. This allows us to know the user's email when the form
  // is submitted.
  handleChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  // form submission: the user is trying to log-in: if all goes well, the user
  // is redirected to them main app. Otherwise, errors are shown.
  handleSubmit(event) {
    const email = this.state.email;
    const response = this.authentication.logIn(email, false);

    if (response.isSuccess()) {
      this.context.router.push('/app');
    } else {
      this.setState({ error: response.errorFor('email') });
    }

    event.preventDefault();
  }

  render() {
    return (
      <div className="well login-signup">
        <Form horizontal>
          <FormGroup controlId="signUpEmail" validationState={this.getValidationState()}>
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl
                type="email"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="your@email.com"
              />
              <FormControl.Feedback />
              <HelpBlock>{this.getValidationHelp()}</HelpBlock>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit" onClick={this.handleSubmit}>
                Log In
              </Button>

              <span className="subscription-tip">
                new user? <a href="#" onClick={() => this.props.onSignUpClick()}>Create an account</a>
              </span>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
};

// Enable redirection through `context.router.push`
LogIn.contextTypes = {
  router: React.PropTypes.object
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
