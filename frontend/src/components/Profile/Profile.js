import React, { useState } from "react";
import axios from "axios";
import { selectUser, updateUser } from "../../Redux/features/Slices/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
const Profile = () => {
  const userInfo = useSelector(selectUser);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    firstName: userInfo.first_name,
    lastName: userInfo.last_name,
    email: userInfo.email,
    tel: userInfo.phone_number,
    address: userInfo.address,
    city: userInfo.city,
    postcode: userInfo.postcode,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/auth/update-profile`,
      user,
      { withCredentials: true }
    );
    if (response.data.status == "success") {
   
      dispatch(updateUser(response.data.user));
    }
  };

  return (
    <>
      <div className="container">
        <header className="col-md-6 text-center">
          <h2>Update Details </h2>
        </header>
        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 ">
          <form onSubmit={(e) => handleSubmit(e)} method="POST">
            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start"></div>

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
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                name="lastName"
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
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                name="email"
              />
            </div>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="tel">
                Mobile Number
              </label>
              <input
                type="tel"
                id="tel"
                className="form-control form-control-lg"
                placeholder="Enter mobile Number"
                value={user.telNumber}
                onChange={(e) => setUser({ ...user, tel: e.target.value })}
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
                onChange={(e) => setUser({ ...user, address: e.target.value })}
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
                onChange={(e) => setUser({ ...user, postcode: e.target.value })}
              />
            </div>

            <div className="text-center text-lg-start mt-4 pt-2">
              <button type="submit" className="btn  btn-outline-dark btn-lg">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
