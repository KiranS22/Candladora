import React from "react";
import { Link } from "react-router-dom";
import {
  selectFilteredProducts,
  fetchAllProducts,
} from "../../Redux/features/Slices/Products/Products";
import { useSelector, useDispatch } from "react-redux";
import Slider from "./Slider/Slider";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  let latestProducts = products.slice(0, 3);
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  return (
    <>
      <div className="slider-container">
        <Slider />
      </div>
      <div className="home-container">
        <div className="container content-wrapper">
          <h2 className="text-center mt-4 mb-4">Our Latest Products</h2>
          <div className="row">
            {latestProducts.map((product) => {
              return (
                <div className="col-12 col-md-4">
                  <div className="card m-2">
                    {!product.image ? (
                      <img
                        src="https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-image-available-icon-flat-vector-illustration.jpg?ver=6"
                        alt={product.description}
                        style={{ width: "100%" }}
                      />
                    ) : (
                      <img
                        src={product.image}
                        className="card-img-top"
                        alt={product.description}
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title limit">{product.name}</h5>

                      <Link
                        to={`/products/${product.id}`}
                        className="btn btn-outline-info"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <hr />
          <div className="about-section">
            <header>
              <h2 className="text-center mt-4 mb-4">Our Mission</h2>
            </header>
            <div className="row">
              <div className="col-sm-6">
                <img
                  src="https://ironbridgecandles.co.uk/wp-content/uploads/2021/03/Effete-Luxury-Candle-With-box-Lit.jpg"
                  style={{ maxWidth: "100%" }}
                />
              </div>
              <div className="col-sm-6 other">
                <p>
                  Here at Candladora we believe that everyone deserves to have a
                  comfortable snd inviting home, However, with the globak
                  finacial crisis, candles and other home accessories are seen
                  more as a luxary item that perhaps isn't so affordable With
                  this in mind, we have partnered up with some of the best small
                  bussinesses from around the globe, to offer{" "}
                  <b>high-quality, luxiourious</b> candles tat an{" "}
                  <b>affirdable</b> price!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
