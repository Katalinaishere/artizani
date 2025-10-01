import { Link } from "react-router-dom";
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section about">
          <h3>About Artizani</h3>
          <p>
            Vendi ku mund te gjesh produkte tradicionale dhe artizanale shqiptare.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: info@artizani.com</p>
          <p>Phone: +355 123 456 789</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">FB</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">IG</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">TW</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Artizani. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
