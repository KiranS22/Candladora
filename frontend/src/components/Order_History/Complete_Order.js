import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchAllProducts } from "../../Redux/features/Slices/Products/Products";
const Complete_Order = () => {
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);
  const { orderid } = useParams();
  const dispatch = useDispatch();
  const getcompleteOrder = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/orders/${orderid}`,
      { withCredentials: true }
    );
    setProducts(response.data.products);


    setOrder(response.data.order);
  
  };
  useEffect(() => {
    dispatch(fetchAllProducts);
    getcompleteOrder();
  }, []);

  return (
    <>
      <div className="order-card">
        <p>{order.id}</p>
        <p>$ {order.amount_due}</p>
        {order.shipping_address ? (
          <p>order.shipping_address</p>
        ) : (
          <p>No address Provided</p>
        )}
        <p>{order.placed_at}</p>
      </div>

      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Product Image </th>
              <th scope="col">Product Price</th>
              <th scope="col">Category</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr>
                  <td>
                    <div className="">
                      <p className="product-in-order-history">
                        {product.product_name}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="">
                      <img
                        src={product.product_image}
                        style={{ maxWidth: "25%" }}
                      />
                    </div>
                  </td>

                  <td>
                    <div className="">
                      <p className="product-in-order-history">
                        ${product.product_price}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="">
                      <p className="product-in-order-history">
                        {product.product_category}
                      </p>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Complete_Order;
