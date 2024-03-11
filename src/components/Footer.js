/*
 * Component: Footer.js
 * Description:
 * The Footer component is rendered on the App Component.
 * Contains the creators contact details.
 */

import React from "react";

export default function Footer() {
  return (
    <footer id="footer" className="sticky-bottom navbar">
      <div className="social-icons">
        <a
          href="https://www.linkedin.com/in/karishma-hegde/"
          target="blank"
          className="sm-button"
          rel="noopener noreferrer"
        >
          <i className="fa fa-linkedin"> </i>
        </a>
        <a
          href="https://github.com/karishmahegde"
          target="blank"
          className="sm-button"
          rel="noopener noreferrer"
        >
          <i className="fa fa-github"></i>
        </a>
        <br />
      </div>
      <div>
        <p>Designed by Karishma using React JS</p>
      </div>
    </footer>
  );
}
