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
    <div className="order-history-container container">
      <h2 className="page-titles text-center">Order Summary</h2>
      <div className="order-card">
        <p>
          <em>Order id: </em>
          {order.id}
        </p>
        <p>
          <em>Amount:</em> $ {order.amount_due}
        </p>
        {order.shipping_address ? (
          <p>
            <em>Shipping address:</em> {order.shipping_address}
          </p>
        ) : (
          <p>
            <em>Shipping address:</em> No address Provided
          </p>
        )}
        <p>
          <em> Order placed at:</em> {order.placed_at}
        </p>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Product Image</th>
              <th scope="col">Product Price</th>
              <th scope="col">Category</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>
                  <div className="">
                    <p className="product-in-order-history">
                      {product.product_name}
                    </p>
                  </div>
                </td>
                <td>
                  <div className="">
                    {product.image ? (
                      <img src={product.image} alt={product.description} />
                    ) : (
                      <img
                        src="https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-image-available-icon-flat-vector-illustration.jpg?ver=6"
                        alt={product.description}
                        
                      />
                    )}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Complete_Order;
