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

  // if there is a currently logged in user, returns a JavaScript object
  // containing user information (that is, `name` and `accessToken`).
  //
  // Returns `undefined` otherwise.
  currentUser() {
    if (this.isLoggedIn()) {
      return JSON.parse(this.storage.getItem('current_user'));
    }
  }

  logOut() {
    this.storage.removeItem('current_user');
  }

  // wraps the call to the API client, parsing the given response.
  // On success, saves the user's access token on the browser's session
  // storage.
  logIn(email, fn) {
    return this.apiClient.logIn(email, (data) => {
      const response = new Response(data);

      if (response.isSuccess()) {
        this.saveInSession(data['name'], data['accessToken']);
      }

      fn(response);
    });
  }

  // wraps an account creation call to the API. Saves the new user information
  // on the session storage, causing the user to be logged in after sign up.
  createAccount(name, email, fn) {
    return this.apiClient.createAccount(name, email, (data) => {
      const response = new Response(data);

      if (response.isSuccess()) {
        this.saveInSession(data['name'], data['accessToken']);
      }

      fn(response);
    });
  }

  // saves the user's name and access token in the session storage.
  // Invoked when the user logs in or signs up.
  saveInSession(name, accessToken) {
    const currentUser = {
      name: name,
      accessToken: accessToken
    };

    this.storage.setItem('current_user', JSON.stringify(currentUser));
  }
}

export default Authentication;
