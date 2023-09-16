import React, { useRef, useState } from "react";
import logo from "../../images/playbox-high-resolution-logo-black-on-transparent-background.png";
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox, InfoWindow   } from '@react-google-maps/api';
import "./Contact.css";

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 34.125499909512676,
  lng: -118.07488384954036,
};

const markerPosition = {
  lat: 34.125499909512676,
  lng: -118.07488384954036,
};

const libraries = ["places"];

const mapStyles =
[
  {
      "stylers": [
          {
              "saturation": 100
          },
          {
              "gamma": 0.6
          }
      ]
  }
]

function Contact() {

  const [searchBox, setSearchBox] = useState(null);
  const [mapCenter, setMapCenter] = useState(center);
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const onPlacesChanged = () => {
    if (!searchBox) return;

    const places = searchBox.getPlaces();

    if (!places || places.length === 0) return;

    const bounds = new window.google.maps.LatLngBounds();

    places.forEach(place => {
      if (!place.geometry) return;

      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });

    const firstPlace = places[0];
    if (firstPlace.geometry && firstPlace.geometry.location) {
      const nextCenter = firstPlace.geometry.location;
      setMapCenter({ lat: nextCenter.lat(), lng: nextCenter.lng() });
    }
  };

  const onSearchBoxLoaded = (ref) => {
    setSearchBox(ref);
  };


  return (
    <div className="contact-page">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-description">
        Whether you have comments, questions, suggestions, or just want to say
        hello, we’re here for fun, and you!
      </p>

      <form
        className="contact-form"
        action="https://formspree.io/f/meqbkwey"
        method="POST"
      >
        <div className="form-group">
            <div className="name-group">
                <div className="single-name">
                    <label htmlFor="firstName">First Name (required)</label>
                    <input type="text" id="firstName" name="firstName" required />
                </div>
                <div className="single-name">
                    <label htmlFor="lastName">Last Name (required)</label>
                    <input type="text" id="lastName" name="lastName" required />
                </div>
            </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address (required)</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject (required)</label>
          <input type="text" id="subject" name="subject" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message (required)</label>
          <textarea id="message" name="message" required></textarea>
        </div>
        <button type="submit" className="contact-submit-button">
          Submit
        </button>
      </form>
      <div className="contact-footer">
        <img className="logo-in-contact" src={logo} alt="Home" />
        <p className="address-in-contact">
          8913 E Greenwood Ave,
          <br />
          San Gabriel, CA 91775
          <br />
          United States
        </p>

        <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={["places"]}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={11}
          options={{ styles: mapStyles }}
        >

        <Marker
        position={markerPosition}
        onMouseOver={() => setShowInfoWindow(true)}
        onMouseOut={() => setShowInfoWindow(false)}
      >
        {showInfoWindow && (
          <InfoWindow onCloseClick={() => setShowInfoWindow(false)}>
            <div>PLAYBOX</div>
          </InfoWindow>
        )}
      </Marker>
          <StandaloneSearchBox
            onLoad={onSearchBoxLoaded}
            onPlacesChanged={onPlacesChanged}
          >

          <input
            type="text"
            placeholder="Search location"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              marginTop: `10px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              top: "10px",
              left: "50%",
              transform: "translateX(-50%)"
            }}
          />
        </StandaloneSearchBox>
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default Contact;
