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
    <>
      <div className="cart">
        <div className="container">
          <div className="grid_12">
            <h1 className="text-center">Your Cart</h1>
          </div>
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
                  {cart.map((item) => (
                    <CartItem item={item} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center  empty">
              <h3>Cart is empty</h3>
            </div>
          )}

          <div className="grid_12 delivery-payment">
            <div className="grid_6 delivery-address">
              {cartCount <= 0 ? (
                <div></div>
              ) : (
                <button
                  className="btn-summary btn btn-outline-danger"
                  onClick={() => emptyCart()}
                >
                  Clear All({cartCount})
                </button>
              )}
            </div>
          </div>

          <div className="grid_12 summary">
            <div className="inner_container">
              <div className="summary-content">
                <div className="col_1of2 meta-data">
                  <div className="sub-total">
                    <em>Sub Total: </em>
                    <span className="amount"></span>
                  </div>
                </div>
                <div className="col_1of2">
                  <div className="total">
                    <span className="amount">£{cartTotal}</span>
                  </div>
                </div>
              </div>
              <div className="btn-summary">
                <Link to="/products" className="btn-checkout btn-reverse">
                  Continue Shopping
                </Link>
                {cartCount > 0 && user !== null ? <CheckoutBtn /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
