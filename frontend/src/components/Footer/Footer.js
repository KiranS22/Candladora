import React from "react";

const Footer = () => {
  return (
    <footer className="custom-footer">
      <p className="footer-text">
        Candladora - &#169; 2022 - All Rights Reversed
      </p>
      <div className="footer-row">
        <p className="footer-developer">Developed By:</p>
        <div className="social-links">
          <i
            class="fa-brands fa-linkedin-in social-icon"
            onClick={() => {
              window.location.href =
                "https://www.linkedin.com/in/kiran-sundal-ba3672212/";
            }}
          ></i>

          <i
            class="fa-brands fa-github social-icon"
            onClick={() => {
              window.location.href = "https://github.com/KiranS22";
            }}
          ></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
