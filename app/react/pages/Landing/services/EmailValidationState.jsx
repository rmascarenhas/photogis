// Indicates the form validation state, used to provide some feedback to
// the user as she fills the log-in form.
//
// This is provided by Bootstrap styles and this method generates the
// validation status label based on the currently value of the email field,
// accessible via this component state.
class EmailValidationState {
  constructor(email) {
    this.email = email
  }

  getState() {
    // if the user hasn't started typing aything yet (or the field is
    // blank), do not assign any state for the email field validation
    if (this.email === '') {
      return null;
    }

    // this is a simple email validation, meant just to enhance the user
    // experience as the email is typed. The final email validation happens
    // at the server side when accounts are created.
    const re = /\S+@\S+\.\S+/;

    if (re.test(this.email)) {
      return 'success';
    }

    // change the feedback to a warning if an `@` symbol is given
    if (/@/.test(this.email)) {
      return 'warning';
    }

    return 'error';
  }
}

export default EmailValidationState;
