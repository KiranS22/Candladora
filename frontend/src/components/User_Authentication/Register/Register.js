import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../../../Resources/CSS/app.css";
import axios from "axios";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verifyPassword: "",
    tel: "",
    address: "",
    city: "",
    postcode: "",
  });
  const [value, setValue] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.verifyPassword) {
      alert("Passwords Must Match");
    } else {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/auth/register`,
        { ...user, tel: value },
        { withCredentials: true }
      );
      const status = response.data.status;
      if (status === "success") {
        navigate("/login");
      } else if (status === "invalid") {
        toast.error("Looks like you already have an account. Please login.");
      }
    }
  };

  return (
    <>
      <section>
        <div className="container-fluid ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://thumbs.dreamstime.com/b/register-now-web-button-illustration-isolated-white-background-register-now-button-pink-121304717.jpg"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={(e) => handleSubmit(e)} method="POST">
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Register with</p>
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    style={{ textTransform: "none" }}
                  >
                    <img
                      style={{
                        width: "20px",
                        marginBottom: "3px",
                        marginRight: "5px",
                      }}
                      alt="Google sign-in"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                    />
                    Google
                  </button>
                </div>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Or</p>
                </div>

                <label className="form-label" htmlFor="firstName">
                  First Name:
                </label>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="firstName"
                    className="form-control form-control-lg"
                    placeholder="Enter your First Name"
                    value={user.firstName}
                    onChange={(e) =>
                      setUser({ ...user, firstName: e.target.value })
                    }
                    name="firstName"
                    required
                  />
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="lastName">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="form-control form-control-lg"
                    placeholder="Enter your Last Name"
                    value={user.lastName}
                    onChange={(e) =>
                      setUser({ ...user, lastName: e.target.value })
                    }
                    name="lastName"
                    required
                  />
                </div>
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="lname">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    name="email"
                    required
                  />
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    name="password"
                    required
                  />
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="verify-password">
                    Re-Enter Password
                  </label>
                  <input
                    type="password"
                    id="verify-password"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    minLength="6"
                    value={user.verifyPassword}
                    onChange={(e) =>
                      setUser({ ...user, verifyPassword: e.target.value })
                    }
                    name="verify-password"
                    required
                  />
                </div>
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="tel">
                    Mobile Number
                  </label>
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={value}
                    onChange={setValue}
                  />
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="country">
                    Address
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    className="form-control form-control-lg"
                    placeholder="Address"
                    value={user.address}
                    onChange={(e) =>
                      setUser({ ...user, address: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="city">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="form-control form-control-lg"
                    placeholder="city"
                    value={user.city}
                    onChange={(e) => setUser({ ...user, city: e.target.value })}
                  />
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="city">
                    Postcode
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="form-control form-control-lg"
                    placeholder="postcode"
                    value={user.postcode}
                    onChange={(e) =>
                      setUser({ ...user, postcode: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn  btn-outline-dark btn-lg"
                  >
                    Register
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Already have an account?{" "}
                    <Link to="/login" className="link-danger">
                      Log In
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Register;
