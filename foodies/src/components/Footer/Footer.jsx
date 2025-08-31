import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Footer.css";

const Footer = () => {
  // Scroll to top when link is clicked
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row gy-4">
          {/* Brand / About */}
          <div className="col-md-4 col-sm-6">
            <Link to="/" onClick={scrollToTop}>
              <img
                src={assets.logo}
                alt="logo"
                height={70}
                width={70}
                className="mb-3 shadow"
              />
            </Link>
            <p className="small">
              Foodies brings you fresh and delicious meals from the best
              food place. Order easily and enjoy fast delivery
              anytime, anywhere in Ahmedabad.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 col-sm-6">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="footer-link" onClick={scrollToTop}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore" className="footer-link" onClick={scrollToTop}>
                  Explore
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link" onClick={scrollToTop}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/myorders" className="footer-link" onClick={scrollToTop}>
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3 col-sm-6">
            <h6 className="fw-bold mb-3">Contact</h6>
            <ul className="list-unstyled small">
              <li>
                <i className="bi bi-geo-alt me-2"></i> Near Income Tax office,
                Ahmedabad, India
              </li>
              <li>
                <i className="bi bi-telephone me-2"></i> +91 8780046578
              </li>
              <li>
                <i className="bi bi-envelope me-2"></i> djaydip889@gmail.com
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-3 col-sm-6">
            <h6 className="fw-bold mb-3">Follow Us</h6>
            <div className="d-flex gap-3">
              <a
                href="https://www.linkedin.com/in/desai-jaydip-6b1617330?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <i className="bi bi-linkedin"></i>
              </a>
              <a
                href="https://www.instagram.com/desai_jaydip_07/profilecard/?igsh=MjloYW9ubndocTk="
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="https://x.com/DesaiJaydip36?t=4PBMdIPTtoX-5AQdMmfYCA&s=09"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <i className="bi bi-twitter"></i>
              </a>
              <a
                href="https://wa.me/918780046578"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <i className="bi bi-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>

        <hr className="mt-4 mb-3" />

        <div className="text-center small">
          © {new Date().getFullYear()} Foodies. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
