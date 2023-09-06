import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectAllProducts } from "../../Redux/features/Slices/Products/Products";

const ProductDetails = () => {
  const products = useSelector(selectAllProducts);
  console.log("all products ", products);

  const { id } = useParams();
  
  let singleProduct = products.find(
    (product) => Number(product.id) === Number(id)
  );


  return (
    <div className="pd-wrap">
      <div className="container">
        <div className="heading-section">
          <h2>Product Details</h2>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="">
              <div className="item">
                {singleProduct.image ? (
                  <img className="headset" src={singleProduct.image} />
                ) : (
                  <img
                    className="headset"
                    src="https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-image-available-icon-flat-vector-illustration.jpg?ver=6"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-dtl">
              <div className="product-info">
                <div className="product-name">
                  <h2>{singleProduct.name}</h2>
                  <h4> {singleProduct.category}</h4>
                </div>

                <div className="product-price-discount">
                  <span>{singleProduct.price}</span>
                </div>
              </div>
              <p>{singleProduct.description}</p>
              <div className="product-count">
                <button className="btn btn-secondary">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
