import React from "react";
import logo from "../../images/playbox-high-resolution-logo-black-on-transparent-background.png";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import "./Contact.css";

function Contact() {
  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: 33.7594,
    lng: -118.0043
  };

  const markerPosition = {
    lat: 33.7594,
    lng: -118.0043
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
          8622 Crockett Cir.
          <br />
          Westminster, CA 92683
          <br />
          United States
        </p>

        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            mapId="8e0a97af9386fef"
          >
            <Marker position={markerPosition} title="8622 Crockett Cir. Westminster, CA 92683, United States" />

          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default Contact;
