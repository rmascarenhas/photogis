import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

// PhotoMap
// This component displays a map (powered by OpenStreetMap) using the leaflet.js
// dependency. By default it asks for the user's current position, and draws
// a map centered on that position if available.
//
// It also allows users to upload pictures associated with positions on the map.
// (TODO)
class PhotoMap extends React.Component {
  constructor() {
    super();

    this.state = {
      position: [1.31, 103.81]
    };
  }

  // tries to retrieve the user's current position. If provided, update this
  // component's state with the coordinates, causing the map to be redrawn
  getUserPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      this.setState({ position: [coords.latitude, coords.longitude] });
    });
  }

  render() {
    const position = this.state.position;
    this.getUserPosition();

    return (
      <Map center={position} zoom={13} id="photogis-map">
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker position={position}>
          <Popup>
            <span>Share your photo here!<br />Easy!</span>
          </Popup>
        </Marker>
      </Map>
    );
  }
}

export default PhotoMap;
