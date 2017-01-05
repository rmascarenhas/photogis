import React from 'react';

// Response format
//
// Successful response:
//
//    { errors: {} }
//
// Failure response:
//
//    {
//      errors: { email: "already_registered", name: "cannot_be_blank" }
//    }
class Response {
  constructor({ errors }) {
    this.errors = errors;
  }

  isSuccess() {
    return Object.keys(this.errors).length === 0;
  }

  errorFor(field) {
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
        email: 'email_invalid'
      }});
    }
  }
}

export default Authentication;
