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
     <div className="container-fluid">
  <div className="row justify-content-center">
    <div className="col-md-8 col-lg-6 col-xl-4">
      <div className="card mt-5">
        <div className="card-body">
          <h2 className="card-title text-center">Update Details</h2>
          <form onSubmit={(e) => handleSubmit(e)} method="POST">
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                className="form-control"
                placeholder="Enter your First Name"
                value={user.firstName}
                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                name="firstName"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                className="form-control"
                placeholder="Enter your Last Name"
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                name="lastName"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter a valid email address"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                name="email"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="tel" className="form-label">
                Mobile Number:
              </label>
              <input
                type="tel"
                id="tel"
                className="form-control"
                placeholder="Enter mobile Number"
                value={user.telNumber}
                onChange={(e) => setUser({ ...user, tel: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="country" className="form-label">
                Address:
              </label>
              <input
                type="text"
                id="country"
                name="country"
                className="form-control"
                placeholder="Address"
                value={user.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="form-control"
                placeholder="City"
                value={user.city}
                onChange={(e) => setUser({ ...user, city: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="postcode" className="form-label">
                Postcode:
              </label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                className="form-control"
                placeholder="Postcode"
                value={user.postcode}
                onChange={(e) => setUser({ ...user, postcode: e.target.value })}
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-dark btn-lg">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default Profile;
