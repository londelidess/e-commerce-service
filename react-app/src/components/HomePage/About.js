import React from 'react';
import './About.css';

function About() {
    return (
        <div className="about-container">
            <h1 className="about-title">About PLAYBOX</h1>
            <p className="about-description">
                Welcome to PLAYBOX, this is e-commerce platform for a diverse range of products. Here's what makes us special:
            </p>
            <ul className="feature-list">
                <li>User-friendly account management with options for sign-up, log in, log out, and even a demo login for trial runs.</li>
                <li>Exclusive features for logged-in users, including adding products to carts, reviewing items, and viewing past orders.</li>
                <li>Comprehensive product management for owners, from adding new items to editing and deleting existing listings.</li>
                <li>Efficient shopping cart system, allowing users to add, view, or remove products, and finalize their purchases.</li>
                <li>Interactive review system where users can post, edit, or delete their product reviews.</li>
                <li>Favorites feature for users to mark and manage their most-loved products.</li>
                <li>Enhanced visual experience with multiple images for product listings.</li>
                <li>Easy access to past orders with an added option to reorder.</li>
            </ul>
        </div>
    );
}

export default About;
