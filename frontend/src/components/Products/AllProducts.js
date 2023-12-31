import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../Redux/features/Slices/Cart/Cart";
import { fetchAllProducts } from "../../Redux/features/Slices/Products/Products";
import { selectFilteredProducts } from "../../Redux/features/Slices/Products/Products";
import { Link } from "react-router-dom";
import axios from "axios";

const AllProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  const filteredProducts = useSelector(selectFilteredProducts);

  const handleClick = async (product) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/cart/${product.id}`,
        { product_qty: 1, product_price: product.price },
        { withCredentials: true }
      );
      console.log("add to cart Response", response);
      dispatch(addToCart(product));
    } catch (err) {
      console.log({ status: "Error", message: err.message, stack: err.stack });
    }
  };

  return (
    <div className="products-container">
      <header className="text-center mt-4">
        <h2 className="page-titles">All Products</h2>
      </header>

      <div className="product-card">
        {filteredProducts.map((product, index) => (
          <div className="card z-depth-4" key={index}>
            <div className="card-content">
              <div className="row">
                <div className="col-12">
                  <img
                    src={
                      product.image ||
                      "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-image-available-icon-flat-vector-illustration.jpg?ver=6"
                    }
                    alt={product.description}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <h2>{product.name}</h2>
                  <p>
                    <strong>Description:</strong> <br />
                    {product.description}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <p className="price">${product.price}</p>
                  <div className="row">
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={() => handleClick(product)}
                    >
                      Add to Cart
                    </button>

                    <Link
                      to={`/products/${product.id}`}
                      className="btn btn-info mt-4"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
