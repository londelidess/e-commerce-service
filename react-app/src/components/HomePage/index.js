import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css"
const HomePage = () => {
  return (
<div>
  <div className="home-container">
    <h1 className="large-heading centered-content">belonging begins with play</h1>
    <p className="centered-content">PLAYBOX makes premium screen-free toys that reflect what’s special about the joyfully diverse world of today’s kids!</p>
    <Link to="/products">
    <button className="shop-now">SHOP NOW</button>
  </Link>
  </div>

  <div className="as-seen-on-container">
    <h1 className="large-heading">as seen on</h1>
  </div>

  <div className="home-container">
    <h2 className="centered-content">PLAYBOX partners with chick-fil-a to celebrate diversity with kids meal toys</h2>
    <p className="centered-content">we had a blast making chick-fil-a kids meals extra special this spring!</p>
    <p className="centered-content">OUR COMMUNITY IS GROWING. CLICK BELOW TO LEARN MORE AND ENTER THE SPECIAL PRIZE DRAW CREATED TO CELEBRATE THE PARTNERSHIP. HURRY, CLOSING SOON!</p>
    <button className="learn-more">Learn More</button>
  </div>
</div>
  );
}

export default HomePage;
