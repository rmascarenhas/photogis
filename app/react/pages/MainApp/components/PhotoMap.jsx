import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

class PhotoMap extends React.Component {
  constructor() {
    super();

    this.state = {
      position: [1.31, 103.81]
    };
  }

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
