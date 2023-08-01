const express = require("express");
const pool = require("../../db");
const usersRouter = express.Router();
// const pool = require("../../elephant");

const bcrypt = require("bcryptjs");

// GET SINGLE USER
usersRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const singleUser = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    res.status(200).send(singleUser.rows[0]);
  } catch (err) {
    res.status(404).send({ status: "Error", message: err.message });
  }
});

// DELETE USER - only to be used if there is an admin functionality required
usersRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(404).send({ status: "error", message: err.message });
  }
});

module.exports = usersRouter;
