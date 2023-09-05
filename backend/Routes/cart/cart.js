const express = require("express");
const cartRouter = express.Router();
const pool = require("../../db");
// const pool = require("../../elephant");

cartRouter.get("/", async (req, res) => {
  if (req.session.user) {
    const { user } = req.session;
    try {
      const usersCart = await pool.query(
        "SELECT * FROM cart INNER JOIN products ON cart.product_id = products.id WHERE cart.user_id = $1",
        [user.id]
      );
      res.status(200).send(usersCart.rows);
    } catch (err) {
      res.status(404).send({ status: "error", message: err.message });
    }
  } else {
    res.send([]);
  }
});

cartRouter.post("/:productid", async (req, res) => {
  try {
    if (req.session.user) {
      const { user } = req.session;
      const { productid } = req.params;
      const { product_qty, product_price } = req.body;

      const existingProducts = await pool.query(
        "SELECT * from cart WHERE product_id =$1 AND user_id =$2",
        [productid, user.id]
      );
      if (existingProducts.rowCount > 0) {
        const foundProduct = existingProducts.rows[0];
        const foundProductQty = foundProduct.product_qty;
        const updatedQty = Number(foundProductQty) + 1;
        const updatedProduct = await pool.query(
          "UPDATE  cart SET product_qty = $1 WHERE product_id = $2 AND user_id = $3",
          [updatedQty, productid, user.id]
        );
        res.send({ status: "success", message: "Product added successfully" });
      } else {
        const newCart = await pool.query(
          "INSERT INTO  cart (product_id, user_id, product_qty, product_price) VALUES($1, $2,$3, $4) RETURNING * ",
          [productid, user.id, product_qty, product_price]
        );
        res.send({ status: "success", message: "Product added successfully" });
      }
    } else {
      res
        .status(403)
        .send({ status: "error", message: "User is not loggedIn!" });
    }
  } catch (err) {
    res.status(404).send({ status: "error", message: err.message });
  }
});

cartRouter.put("/:productid", async (req, res) => {
  try {
    if (req.session.user) {
      const { user } = req.session;
      const { productid } = req.params;
      const { product_qty, product_price } = req.body;

      const existingProducts = await pool.query(
        "SELECT * from cart WHERE product_id =$1 AND user_id =$2",
        [productid, user.id]
      );
      if (existingProducts.rowCount > 0) {
        const updatedQty = Number(product_qty);
        const updatedProduct = await pool.query(
          "UPDATE  cart SET product_qty = $1 WHERE product_id = $2 AND user_id = $3",
          [updatedQty, productid, user.id]
        );
        res.send({
          status: "success",
          message: "Quantity updated successfully",
        });
      } else {
        res.send({ status: "error", message: "Product not found" });
      }
    } else {
      res
        .status(403)
        .send({ status: "error", message: "User is not loggedIn!" });
    }
  } catch (err) {
    res.status(404).send({ status: "error", message: err.message });
  }
});
cartRouter.delete("/:productid", async (req, res) => {
  try {
    const { productid } = req.params;
    if (req.session.user) {
      const { user } = req.session;
      const deletedCartItem = await pool.query(
        "DELETE FROM cart WHERE product_id = $1 AND user_id = $2",
        [productid, user.id]
      );
      res.send({ status: "success", message: "Item deleted successfully!" });
    } else {
      res.status(403).send({ status: "error", message: "User not logged In" });
    }
  } catch (err) {
    res.status(404).send({ status: "error", message: err.message });
  }
});

cartRouter.delete("/", async (req, res) => {
  try {
    if (req.session.user) {
      const { user } = req.session;
      await pool.query("DELETE FROM cart WHERE user_id =$1", [user.id]);
      res.send({
        status: "success",
        message: "cart has been cleared successfully",
      });
    }
  } catch (err) {
    res.status(404).send({ status: "error", message: err.message });
  }
});

module.exports = cartRouter;
