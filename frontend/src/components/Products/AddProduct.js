import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addProduct } from "../../Redux/features/Slices/Products/Products";
import { useDispatch } from "react-redux";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    imageUrl: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/products`,
        product
      );

      if (response.data.status === "success") {
        let product = response.data.product;
        dispatch(addProduct(product));
        navigate("/products");
      }

      setProduct({
        name: "",
        price: "",
        category: "",
        description: "",
        imageUrl: "",
      });
    } catch (err) {
      toast.error("Something went wrong, please try again later");
      console.error(err);
    }
  };
  return (
    <>
      <header className="text-center mt-4">
        <h2 className="page-titles">Add A Product</h2>
      </header>
      <div className="container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group mt-4">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="productName"
              aria-describedby="productName"
              placeholder="Enter Product Name"
              value={product.name}
              onChange={(e) => {
                setProduct({ ...product, name: e.target.value });
              }}
            />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="productPrice">Product Price</label>
            <input
              type="number"
              className="form-control"
              id="productPrice"
              aria-describedby="productPrice"
              placeholder="Enter Product Price"
              value={product.price}
              onChange={(e) => {
                setProduct({ ...product, price: e.target.value });
              }}
            />
          </div>

          <div className="form-group mt-4">
            <label htmlFor="productCategory">Product Category</label>
            <input
              type="text"
              className="form-control"
              id="productCategory"
              aria-describedby="productCategory"
              placeholder="Enter Product Category"
              value={product.category}
              onChange={(e) => {
                setProduct({ ...product, category: e.target.value });
              }}
            />
          </div>

          <div className="form-group mt-4">
            <label htmlFor="productDescription">Product Decription</label>
            <textarea
              maxLength="500"
              className="form-control"
              id="productDescription"
              aria-describedby="productDescrition"
              placeholder="Enter Product Description"
              value={product.description}
              onChange={(e) => {
                setProduct({ ...product, description: e.target.value });
              }}
            />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="productDescription">Product Image</label>
            <input
              type="text"
              className="form-control"
              id="productImage"
              aria-describedby="productImage"
              placeholder="Enter Product Image"
              value={product.imageUrl}
              onChange={(e) => {
                setProduct({ ...product, imageUrl: e.target.value });
              }}
            />
          </div>
          <button type="submit" className="btn btn-outline-primary mt-4">
            {" "}
            Add Product
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
