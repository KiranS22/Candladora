import React from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="text-center notfound">
        <header>
          <h1> Page Not Found</h1>

          <button
            className="btn btn-outline-primary not-found-btn"
            onClick={() => {
              navigate("/");
            }}
            type="button"
          >
            {" "}
            Go Home
          </button>
        </header>
      </div>
    </>
  );
};
