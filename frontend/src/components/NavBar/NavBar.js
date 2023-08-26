import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartCount } from "../../Redux/features/Slices/Cart/Cart";
import { filterSearch } from "../../Redux/features/Slices/Products/Products";
import { selectIsLoggedIn } from "../../Redux/features/Slices/Auth/Auth";
import axios from "axios";
import { logOutUser } from "../../Redux/features/Slices/Auth/Auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const cartCount = useSelector(selectCartCount);
  const loggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const searchProducts = (e) => {
    setSearchTerm(e.target.value);
    dispatch(filterSearch(e.target.value));
  };

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/auth/logout`,
        {
          withCredentials: true,
        }
      );
      if (data.status === "success") {
        dispatch(logOutUser());
        navigate("/login");
      } else {
      }
    } catch (err) {
      console.log({ status: "Error", message: err.meesage });
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-colors">
      <div className="container-fluid">
        <Link className="navbar-brand logo text-white" to="/">
          Candladora
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon text-white"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item underline">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item underline">
              <Link className="nav-link text-white" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item underline">
              <Link className="nav-link text-white" to="/products/add">
                Add A Product
              </Link>
            </li>
            <li className="nav-item underline">
              <Link className="nav-link text-white " to="/order-history">
                Order History
              </Link>
            </li>

            <div style={{ margin: "0 3.5em" }}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => searchProducts(e)}
              />
            </div>
            <li className="nav-item">
              <Link to="/cart" className="nav-link text-white">
                <img
                  className="cart-img"
                  src="https://img.icons8.com/material-sharp/24/FFFFFF/shopping-cart.png"
                  alt="shopping-cart"
                  style={{ width: 30, height: 30 }}
                />
                {cartCount > 0 ? (
                  <span className="cart-count"> {cartCount} </span>
                ) : null}
              </Link>
            </li>

            {!loggedIn ? (
              <>
                <li className="nav-item underline">
                  <Link to="/login" className="nav-link text-white">
                    Log In
                  </Link>
                </li>
                <li className="nav-item underline">
                  <Link to="/register" className="nav-link text-white">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link text-white">
                    <img
                      src="https://img.icons8.com/ios-filled/50/FFFFFF/user-female-circle.png"
                      alt="user-female-circle"
                      style={{ width: 30, height: 30 }}
                    />
                  </Link>
                </li>
                <li className="nav-item underline">
                  <span
                    className="nav-link text-white  cursor-pointer"
                    onClick={() => {
                      logoutHandler();
                    }}
                  >
                    Log Out
                  </span>{" "}
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
