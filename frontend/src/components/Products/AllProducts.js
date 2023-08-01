import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/features/Slices/Cart/Cart";
import { fetchAllProducts } from "../../Redux/features/Slices/Products/Products";
import {
  selectAllProducts,
  selectFilteredProducts,
} from "../../Redux/features/Slices/Products/Products";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
const AllProducts = () => {
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);
  const filteredProducts = useSelector(selectFilteredProducts);
  const dispatch = useDispatch();
  const handleClick = async (product) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/cart/${product.id}`,
        { product_qty: 1, product_price: product.price },
        { withCredentials: true }
      );
      dispatch(addToCart(product));
    } catch (err) {
      console.log({ status: "Error", message: err.message });
    }
  };
  return (
    <>
      <header className="text-center mt-4">
        <h2 className="page-titles">All Products</h2>
      </header>

      <div className="row">
        {filteredProducts.map((product, index) => {
          return (
            <>
              <div className="col-12 col-md-4 mt-4">
                <div className="card" key={index}>
                  {product.image ? (
                    <img
                      className="card-img-top"
                      src={product.image}
                      alt={product.description}
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <img
                      src="https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-image-available-icon-flat-vector-illustration.jpg?ver=6"
                      alt={product.description}
                      style={{ width: "100%" }}
                    />
                  )}
                  <h1 className="limit">{product.name}</h1>
                  <p>${product.price}</p>
                  <p>
                    <button
                      className="btn a-p-btn"
                      type="button"
                      onClick={() => handleClick(product)}
                    >
                      Add to Cart
                    </button>

                    <Link
                      to={`/products/${product.id}`}
                      className="btn btn-outline-dark mt-4"
                    >
                      View Details
                    </Link>
                  </p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default AllProducts;
