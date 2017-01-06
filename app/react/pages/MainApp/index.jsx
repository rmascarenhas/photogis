import React from 'react';

require('./styles.css');

import Navigation from './components/Navigation';
import PhotoMap from './components/PhotoMap';

const MainApp = (props) => {
  return (
    <div id="photogis-app">
      <Navigation />

      <h2>Share your photos on the map below:</h2>
      <PhotoMap />
    </div>
  );
};

export default MainApp;
