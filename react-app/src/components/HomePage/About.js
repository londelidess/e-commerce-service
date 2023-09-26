import React from 'react';
import './About.css';

function About() {
    return (
        <div className="about-container">
            <h1 className="about-title">About PLAYBOX</h1>
            <p className="about-description">
                Welcome to PLAYBOX, an e-commerce platform where users can explore a plethora of products, indulge in product reviews, and seamlessly complete purchases.
            </p>
            <ul className="feature-list">
                <li>User-friendly account management including options for new account creation, log in, log out, and even a demo login for trial use.</li>
                <li>Exclusive features for logged-in users such as adding products to carts, posting product reviews, and viewing past orders.</li>
                <li>Upon logging in, users are directed to their profile page showcasing past orders and favorite products.</li>
                <li>Logged out users are directed to the main product browsing page.</li>
                <li>All users can view the assortment of available products, while product owners have the capability to add, edit, or delete their listings.</li>
                <li>Interactive search bar to efficiently find desired products.</li>
                <li>Enhanced shopping experience allowing users to manage their cart, complete transactions, and even reorder past items.</li>
                <li>A dynamic review system where users can post, edit, or delete their feedback on products, which is visible to all.</li>
                <li>Favorites feature for users to bookmark, view, and manage their cherished products.</li>
                <li>Visual treat with the ability for product owners to upload multiple images for their listings and users (if permitted) can add images to their reviews.</li>
                <li>Bonus Feature: PLAYBOX Chatbot - An innovative assistant aimed at elevating user experience, answering FAQs, and directing users to the right product categories. It's trained on PLAYBOX-specific queries and can even suggest products!</li>
            </ul>
        </div>
    );
}

export default About;
