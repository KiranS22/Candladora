import React from "react";
const Footer = () => {
  return (
    <>
      <footer className="text-center">
        Candladora - &#169; 2022 - All Rights Reversed
        <div className="row">
          <p>Developed By:</p>
          <div className="social-link">
            <i
              onClick={() => {
                window.location.href =
                  "https://www.linkedin.com/in/kiran-sundal-ba3672212/";
              }}
              className="fa-brands fa-linkedin f-icon"
            ></i>

            <i
              onClick={() => {
                window.location.href = "https://github.com/KiranS22";
              }}
              className="fa-brands fa-github f-icon"
            ></i>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
