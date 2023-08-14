import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../../images/playbox-high-resolution-logo-black-on-transparent-background.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="nav-container">
      <div>
        <NavLink exact to="/">
          <img className="logo" src={logo} alt="Home" />
        </NavLink>
      </div>
      {isLoaded && (
        <div className="profile-section">
          <div className="social-icons">
            {/* <a href="https://www.instagram.com/your_username/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a> */}
            <a href="https://www.linkedin.com/in/makoto-doi/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100004164127853" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
          </div>
          <div className="profile-button-container">
            <ProfileButton user={sessionUser} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Navigation;
