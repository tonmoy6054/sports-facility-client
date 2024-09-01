import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          {/* <a href="#about" className="text-sm hover:underline mx-2">
            About Us
          </a> */}
          <Link to="/about">About us</Link>
          {/* <a href="#contact" className="text-sm hover:underline mx-2">
            Contact Us
          </a> */}
          <Link to="/contact">Contact Us</Link>
          <a href="#social" className="text-sm hover:underline mx-2">
            Social Media
          </a>
        </div>
        <div id="social" className="flex justify-center space-x-6 my-4">
          <a
            href="https://www.facebook.com"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faFacebook}
              size="2x"
              className="hover:text-blue-500 transition-colors duration-300"
            />
          </a>
          <a
            href="https://www.twitter.com"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faTwitter}
              size="2x"
              className="hover:text-blue-400 transition-colors duration-300"
            />
          </a>
          <a
            href="https://www.instagram.com"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              size="2x"
              className="hover:text-pink-500 transition-colors duration-300"
            />
          </a>
        </div>
        <p className="text-sm mt-4">
          &copy; 2024 ReserveArena. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
