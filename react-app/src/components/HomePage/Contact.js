import React from "react";
import logo from "../../images/playbox-high-resolution-logo-black-on-transparent-background.png";
import "./Contact.css";

function Contact() {
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
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message"></textarea>
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
      </div>
    </div>
  );
}

export default Contact;
