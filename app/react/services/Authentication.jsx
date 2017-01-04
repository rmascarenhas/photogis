import React from 'react';

// Response format
//
//    {
//      "success": true/false,
//      "errors": { "email": ["email_invalid"] }
//    }
class Response {
  constructor({ errors }) {
    this.errors = errors;
  }

  isSuccess() {
    return Object.keys(this.errors).length === 0;
  }

  errorsFor(field) {
    return this.errors[field];
  }
}

class Authentication {
  isLoggedIn() {
    return false;
  }

  logIn(email, success) {
    if (success) {
      return new Response({ errors: {} });
    } else {
      return new Response({ errors: {
        email: 'invalid_email'
      }});
    }
  }
}

export default Authentication;
