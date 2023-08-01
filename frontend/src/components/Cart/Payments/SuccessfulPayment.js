import React from "react";

const SuccessfulPayment = () => {
  return (
    <div className="container" style={{ height: "82vh" }}>
      <div
        className="success card"
        style={{ marginTop: "8rem", padding: "2rem" }}
      >
        <div
          style={{
            borderRadius: "200px",
            height: "200px",
            width: "200px",
            background: "#F8FAF5",
            margin: "0 auto",
          }}
        >
          <i classname=" success checkmark">✓</i>
        </div>
        <h1 className="success">Success</h1>
        <p className="success">
          We received your purchase request;
          <br /> we'll be in touch shortly! Your order number is:
        </p>
      </div>
    </div>
  );
};

export default SuccessfulPayment;
