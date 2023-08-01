const express = require("express");
const ordersRouter = express.Router();
const pool = require("../../db");
// const pool = require("../../elephant");

ordersRouter.get("/", async (req, res) => {
  try {
    if (req.session.user) {
      const { user } = req.session;
      const AllOrdersFromUser = await pool.query(
        "SELECT * FROM orders WHERE user_id= $1",
        [user.id]
      );
      res.status(200).send(AllOrdersFromUser.rows);
    } else {
      res
        .status(403)
        .send({ status: "error", message: "User is not logged in" });
    }
  } catch (err) {
    res.status(404).send({ status: "error", message: err.message });
  }
});

ordersRouter.get("/:orderid", async (req, res) => {
  const { orderid } = req.params;

  try {
    if (req.session.user) {
      const { user } = req.session;
      const orderProducts = await pool.query(
        "SELECT ordered_products.product_qty AS product_quantity, ordered_products.product_id, ordered_products.product_price, products.name AS product_name,products.price AS  product_price, products.category AS product_category, products.image AS product_image FROM orders INNER JOIN  ordered_products ON orders.id = ordered_products.order_id INNER JOIN products ON ordered_products.product_id = products.id WHERE orders.user_id = $1 AND orders.id=$2",
        [user.id, orderid]
      );
      const orderInfo = await pool.query(
        "SELECT * FROM orders WHERE id=$1 AND user_id = $2",
        [orderid, user.id]
      );

      res.send({ products: orderProducts.rows, order: orderInfo.rows[0] });
    } else {
      res.status(403).send({ status: "error", message: "User Not Logged In" });
    }
  } catch (err) {
    res.status(404).send({ status: "error", message: err.message });
  }
});

ordersRouter.delete("/:orderid", async (req, res) => {
  try {
    const { orderid } = req.params;
    const deletedOrder = await pool.query("DELETE FROM  orders WHERE id = $1", [
      orderid,
    ]);
    res.send("order deleted Successfully");
  } catch (err) {
    res.status(404).send({ status: "error", message: err.message });
  }
});

module.exports = ordersRouter;
