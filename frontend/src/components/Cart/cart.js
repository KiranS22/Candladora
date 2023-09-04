import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCart,
  findCartItemsTotal,
  selectCartTotal,
  selectCartCount,
  clearCart,
} from "../../Redux/features/Slices/Cart/Cart";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import axios from "axios";
import CheckoutBtn from "./Payments/CheckoutBtn";
import { selectUser } from "../../Redux/features/Slices/Auth/Auth";
import { fetchAllCartItems } from "../../Redux/features/Slices/Cart/Cart";

const Cart = () => {
  const dispatch = useDispatch();
  const cartTotal = useSelector(selectCartTotal);
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);

  const cartCount = useSelector(selectCartCount);

  const deleteFromDatabase = async () => {
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/cart`,
      { withCredentials: true }
    );
  };

  useEffect(() => {
    dispatch(findCartItemsTotal());
  }, [cart]);

  const emptyCart = async () => {
    dispatch(clearCart());
    deleteFromDatabase();
  };

  return (
    <div className="cart">
      <div className="container">
        <h1 className="text-center mt-3">Your Cart</h1>
        {cartCount > 0 ? (
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Price</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <CartItem key={index} item={item} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center empty">
            <h3>Cart is empty</h3>
          </div>
        )}

        <div className="d-flex justify-content-center mt-3">
          {cartCount > 0 ? (
            <button
              className="btn btn-danger mt-2"
              onClick={() => emptyCart()}
            >
              Clear All ({cartCount})
            </button>
          ) : null}
        </div>

        <div className="d-flex justify-content-between  cart-controls">
          <div className="sub-total">
            <em>Sub Total:</em>
            <span className="amount">${cartTotal}</span>
          </div>
          <div className="btn-summary">
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
            {cartCount > 0 && user !== null ? <CheckoutBtn /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
