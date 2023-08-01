import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectAllProducts } from "../../Redux/features/Slices/Products/Products";

const ProductDetails = () => {
  const products = useSelector(selectAllProducts);

  const { id } = useParams();
  let singleProduct = products.find(
    (product) => Number(product.id) === Number(id)
  );

  return (
    <>
      <div className="details-container">
        <div className="row">
          <div className="left col-md-6">
            {singleProduct.image ? (
              <img className="headset" src={singleProduct.image} />
            ) : (
              <img
                className="headset"
                src="https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-image-available-icon-flat-vector-illustration.jpg?ver=6"
              />
            )}
          </div>
          <div className="right col-md-6">
            <h4 className="categorie">{singleProduct.name}</h4>
            <h3 className="product">{singleProduct.category} </h3>
            <div className="desc">
              <p>{singleProduct.description}</p>
            </div>

            <p className="price">{singleProduct.price}</p>
            <p className="buy">Buy now</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
