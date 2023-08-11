import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
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
        <div className="profile-button-container">
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </div>
  );
}

export default Navigation;
