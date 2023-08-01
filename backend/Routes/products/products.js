const express = require("express");
const productsRouter = express.Router();
const pool = require("../../db");
// const pool = require("../../elephant");

// /products (GET)
productsRouter.get("/", async (req, res) => {
  try {
    const allProducts = await pool.query(
      "SELECT * FROM products ORDER BY id DESC"
    );
    res.status(200).send(allProducts.rows);
  } catch (err) {
    res.status(404).send({ status: "error", message: err.message });
  }
});

// Add a new product
productsRouter.post("/", async (req, res) => {
  const { name, price, category, description, imageUrl } = req.body;
  try {
    const allProducts = await pool.query(
      "INSERT INTO products(name, price, category, description, image) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [name, price, category, description, imageUrl]
    );

    res.status(200).send({ status: "success", product: allProducts.rows[0] });
  } catch (err) {
    console.log(err);
  }
});

// Get a Single product.
productsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleProduct = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );
    res.status(200).send(singleProduct.rows[0]);
  } catch (err) {
    res.status(404).send({ status: "error", message: err.message });
  }
});

// Update single product
productsRouter.put("/:id", async (req, res) => {
  const { price } = req.body;
  const { id } = req.params;

  try {
    const updatedProduct = await pool.query(
      "UPDATE  products SET price = $1 WHERE id = $2",
      [price, id]
    );
    res.status(200).send("Product Updated Successfully");
  } catch (err) {
    res.status(404).send({ status: 'error', message: err.message });
  }
});

// Delete a single product
productsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await pool.query(
      "DELETE FROM  products WHERE id = $1",
      [id]
    );
    res.status(200).send("Product deleted Successfully");
  } catch (err) {
    res.status(404).send({ status: 'error', message: err.message });
  }
});

module.exports = productsRouter;
