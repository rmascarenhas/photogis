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
    this.storage = sessionStorage;
  }

  isLoggedIn() {
    return !!this.storage.getItem('current_user');
  }

  // wraps the call to the API client, parsing the given response.
  // On success, saves the user's access token on the browser's local
  // storage.
  logIn(email, fn) {
    return this.apiClient.logIn(email, (data) => {
      const response = new Response(data);

      if (response.isSuccess()) {
        const currentUser = {
          name: data['name'],
          accessToken: data['accessToken']
        };

        this.storage.setItem('current_user', JSON.stringify(currentUser));
      }

      fn(response);
    });
  }
}

export default Authentication;
