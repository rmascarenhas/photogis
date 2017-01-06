import React from 'react';
require('./styles.css');

import Navigation from './components/Navigation';

const MainApp = (props) => {
  return (
    <div id="photogis-app">
      <Navigation />
      <h2>Main App</h2>
    </div>
  );
};

export default MainApp;
