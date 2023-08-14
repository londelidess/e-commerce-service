import logo from "../../images/playbox-high-resolution-logo-black-on-transparent-background.png";
import { FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import "./Footer.css";

function Footer() {
    return (
      <footer className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={logo} alt="Footer Logo" />
          </div>
          <div className="footer-links">
            <a href="#">About Us</a>
            <a href="#">Contact</a>
            <a href="#">Privacy Policy</a>
          </div>
          <div className="footer-social-icons">
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
          <div className="footer-copyright">
            © 2023 PLAYBOX. All rights reserved.
          </div>
        </div>
      </footer>
    );
}

  export default Footer;
