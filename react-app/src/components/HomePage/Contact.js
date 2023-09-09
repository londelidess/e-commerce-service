import React from 'react';
import "./Contact.css";

function Contact() {
    return (
        <div className="contact-page">
            <h1 className="contact-title">Contact Us</h1>
            <p className="contact-description">Whether you have comments, questions, suggestions, or just want to say hello, we’re here for fun, and you!</p>
            <form className="contact-form">
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
                <button type="submit" className="submit-button">Submit</button>
            </form>

        </div>
    );
}
export default Contact;
