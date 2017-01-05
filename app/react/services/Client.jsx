import React from 'react';
import axios from 'axios';

// API client for the back-end of this application. Provides thin methods
// to perform API calls. Responses are returned as given by the server.
// The understanding of the returned response is a responsibility of
// layers above this one.
class Client {
  constructor() {
    // uses a single HTTP client for each API client instance.
    // By default, timeout after 5s to avoid locking the application without
    // any feedback being provided.
    //
    // All requests are JSON encoded.
    this.httpClient = axios.create({
      baseURL: API_URL,
      timeout: 5000,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // API call
  //    /users/login
  logIn(email, fn) {
    const body = { email: email }
    return this.performRequest('/users/login', body, fn);
  }

  performRequest(url, body, fn) {
    this.httpClient.post(url, body)
      .then((response) => {
        return fn(response.data);
      })
      .catch((error) => {
        if (error.response) {
          return fn(error.response.data);
        } else {
          return fn({ errors: { system: error.message } });
        }
      });
  }
}

export default Client;
