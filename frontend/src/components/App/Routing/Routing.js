import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllProducts from "../../Products/AllProducts";
import NavBar from "../../NavBar/NavBar";
import Cart from "../../Cart/cart";
import Home from "../../Home/Home";
import Register from "../../User_Authentication/Register/Register";
import Login from "../../User_Authentication/Login/login";
import ProtectedRoutes from "../../Routing/ProtectedRoutes";
import ProductDetails from "../../Products/ProductDetails";
import Profile from "../../Profile/Profile";
import Order_History from "../../Order_History/Order_History";
import SuccessfulPayment from "../../Cart/Payments/SuccessfulPayment";
import AddProduct from "../../Products/AddProduct";
import Complete_Order from "../../Order_History/Complete_Order";
import Footer from "../../Footer/Footer";
import { NotFound } from "../../NotFound/NotFound";

const Routing = () => {
  return (
    <>
      <Router>
        <NavBar />

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/products" exact element={<AllProducts />} />
          <Route path="/checkout-success" element={<SuccessfulPayment />} />
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/products/add" exact element={<AddProduct />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order-history" element={<Order_History />} />
            <Route
              path="/order-history/:orderid"
              element={<Complete_Order />}
            />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/products/:id" exact element={<ProductDetails />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default Routing;
