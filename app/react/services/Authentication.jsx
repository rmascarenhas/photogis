import React from 'react';
import Client from './Client';

// Response format
//
// Successful response:
//
//    { status: 'OK', ... } // no `errors` key
//
// Failure response:
//
//    {
//      errors: { email: "already_registered", name: "cannot_be_blank" }
//    }
class Response {
  constructor({ errors }) {
    this.errors = errors || {};
  }

  // a successful response is that which does not have any errors.
  isSuccess() {
    return Object.keys(this.errors).length === 0;
  }

  errorFor(field) {
    return this.errors[field];
  }
}

class Authentication {
  constructor() {
    this.apiClient = new Client();
  }

  isLoggedIn() {
    return false;
  }

  // wraps the call to the API client, parsing the given response
  logIn(email, fn) {
    return this.apiClient.logIn(email, (data) => fn(new Response(data)));
  }
}

export default Authentication;
