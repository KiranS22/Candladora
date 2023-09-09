import React from "react";
import {
  selectAllOrders,
  fetchUserOrders,
} from "../../Redux/features/Slices/Orders/orders";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const OrderHistory = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, []);

  const orders = useSelector(selectAllOrders);

  return (
    <div className="container mt-4 mb-4">
      <h2 className="text-center">Your Orders</h2>

      {orders.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Total Price</th>
                <th scope="col">Placed At</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>${order.amount_due}</td>
                  <td>{moment(order.placed_at).format("DD/MM/YYYY HH:MM")}</td>
                  <td>
                    <Link to={`/order-history/${order.id}`}>More Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center">
          <h3>No Orders Yet</h3>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
