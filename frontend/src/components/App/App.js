import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import axios from "axios";
import { logInUser } from "../../Redux/features/Slices/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { selectCartIsLoading } from "../../Redux/features/Slices/Cart/Cart";
import { selectProductsIsLoading } from "../../Redux/features/Slices/Products/Products";
import { fetchAllCartItems } from "../../Redux/features/Slices/Cart/Cart";
import ApplicationRoutes from "./Routing/Routing";

const App = () => {
  const loadingProducts = useSelector(selectProductsIsLoading);
  const loadingCart = useSelector(selectCartIsLoading);
  const dispatch = useDispatch();

  const getLoggedInUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/auth/auth-user`,
        {
          withCredentials: true,
        }
      );


      if (response.data.status === "success") {
        const { user } = response.data;
        dispatch(logInUser(user));
      }
    } catch (err) {

    }
  };

  useEffect(() => {
    getLoggedInUser();
    dispatch(fetchAllCartItems());
  }, []);

  return (
    <div className="App">
      {loadingProducts && loadingCart ? (
        <div className="preloader-container">
          <div className="lds-dual-ring"></div>
        </div>
      ) : null}
      <ApplicationRoutes />
      <ToastContainer />
    </div>
  );
};

export default App;
