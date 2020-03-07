import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

class StoreMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        lat: null,
        lng: null
      }
    };
  }
  componentDidMount() {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${this.props.address}&key=AIzaSyDKRzpW8lLmF3O1eHMjgx1E6DAmCCFG4zc`
    )
      .then(res => res.json())
      .then(json => this.setState({ data: json.results[0].geometry.location }));
  }

  static defaultProps = {
    zoom: 16
  };

  render() {
    let { data } = this.state;

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "35vh", width: "100%" }}>
        <GoogleMapReact center={this.state.data} defaultZoom={this.props.zoom}>
          <Marker lat={data.lat} lng={data.lng} name="MY STORE" color="red" />
        </GoogleMapReact>
      </div>
    );
  }
}

export default StoreMap;
