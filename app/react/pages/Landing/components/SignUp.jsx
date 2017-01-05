import React from 'react';
import { Button, Form, FormGroup, FormControl, Col, ControlLabel, HelpBlock } from 'react-bootstrap';

import Authentication from '../../../services/Authentication';
import EmailValidationState from '../services/EmailValidationState';

// SignUp: this is the sign-up form. User's name and email are requested in order
// to create a new account. This performs an API call when the user provides the data
// and, When successful, the user is logged into the application
//
// If there are any errors when creating the account, feedback is given to the user
// inline in the form.
class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      errors: {}
    };

    this.authentication = new Authentication();
    this.handleSubmit = this.handleSubmit.bind(this);

    // maps the codes from possible error scenarios when creating accounts
    // to human readable help messages to be displayed inline on the form
    this.validationMessages = {
      name_not_given: 'Please tell us your name',
      email_not_given: 'Please tell us your email',
      email_invalid: 'This is not a valid email address',
      email_taken: 'This email is already registered'
    };

    // when the error is not recognised, display a generic error message
    this.defaultError = 'Something went wrong. Please try again later';
  }

  getNameValidationState() {
    // if the user still did not type anything, no feedback is needed
    if (this.state.name === '') {
      return null;
    }

    // otherwise, if anyting is typed, consider it to be a valid name
    return 'success';
  }

  getEmailValidationState() {
    return new EmailValidationState(this.state.email).getState();
  }

  validationHelpFor(field) {
    const error = this.state.errors[field];

    if (error === undefined) {
      return '';
    }

    return this.validationMessages[error] || this.defaultError;
  }

  // returns a function to be used as a onchange callback for the sign up form.
  // It receives a `field` as parameter (which, for the sign up form, can be either
  // `name` or `email`), and returns a function, bound to this component context,
  // to be used when the field changes.
  //
  // The returned function, when invoked, updates the component state with the value
  // currently filled in the field.
  handleChangeFor(field) {
    const handler = (event) => {
      const newState = {
        name: this.state.name,
        email: this.state.email
      };

      newState[field] = event.target.value;
      this.setState(newState);
    };

    return handler.bind(this);
  }

  // handles the form submission. Performs an API request to create the account.
  // When successful, the newly registered user is redirected to the main app.
  // Otherwise, the errors are shown in the user interface.
  handleSubmit(event) {
    const name = this.state.name;
    const email = this.state.email;

    const response = this.authentication.createAccount(name, email, (response) => {
      if (response.isSuccess()) {
        this.context.router.push('/app');
      } else {
        this.setState({
          errors: { name: response.errorFor('name'), email: response.errorFor('email') }
        });
      }
    });

    event.preventDefault();
  }

  render() {
    return (
      <div className="well login-signup">
        <Form horizontal>
          <FormGroup controlId="signUpName" validationState={this.getNameValidationState()}>
            <Col componentClass={ControlLabel} sm={2}>
              Name
            </Col>
            <Col sm={10}>
              <FormControl
                placeholder="Full Name"
                value={this.state.name}
                onChange={this.handleChangeFor('name')}
              />
              <FormControl.Feedback />
              <HelpBlock>{this.validationHelpFor('name')}</HelpBlock>
            </Col>
          </FormGroup>

          <FormGroup controlId="signUpEmail" validationState={this.getEmailValidationState()}>
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl
                type="email"
                value={this.state.email}
                onChange={this.handleChangeFor('email')}
                placeholder="your@email.com"
              />
              <FormControl.Feedback />
              <HelpBlock>{this.validationHelpFor('email')}</HelpBlock>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsStyle="primary" type="submit" onClick={this.handleSubmit}>
                Create Account
              </Button>

              <span className="subscription-tip">
                already have an account? <a href="#" onClick={this.props.onLogInClick}>Log in</a>
              </span>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

SignUp.contextTypes = {
  router: React.PropTypes.object
};

export default SignUp;
