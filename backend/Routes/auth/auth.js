const express = require("express");
const authRouter = express.Router();
const pool = require("../../db");
// const pool = require("../../elephant");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const session = require("express-session");
const pgSessionStore = require("connect-pg-simple")(session);

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await pool.query("SELECT *  FROM users WHERE email= $1", [email]);

    if (foundUser.rows.length > 0) {
      if (await bcrypt.compare(password, foundUser.rows[0].password)) {
        req.session.loggedIn = true;
        req.session.user = foundUser.rows[0];
        req.session.save();
        res.status(201).send({ user: req.session.user, status: "success" });
      } else {
        res.status(200).send("A user with these credentials does not exist! Please register");
      }
    } else {
      res.status(200).send("User with that email or password not found");
    }
  } catch (err) {
    res.status(404).send({ status: "error", message: err.message });
  }
});

authRouter.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      tel,
      address,
      city,
      postcode,
    } = req.body;

    // Check if the user already exists
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).send({ status: "invaild", message: "User already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const allUsers = await pool.query(
      "INSERT INTO users(first_name, last_name, email, password, phone_number, address, city, postcode) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [firstName, lastName, email, hash, tel, address, city, postcode]
    );

    res.status(200).send({ user: allUsers.rows[0], status: "success" });
  } catch (err) {
    res.status(401).send({ status: "error", message: err.message });
  }
});


authRouter.get("/auth-user", (req, res) => {
  try {
    if (req.session.user) {
      res.status(201).send({ user: req.session.user, status: "success" });
    } else {
      res.status(403).send({ status: "error", message: "User is not logged In" });
    }
  } catch (err) {
    res.status(404).send({ status: "error", message: err.message });
  }
});

authRouter.get("/logout", async (req, res) => {
  try {
    const id = req.session.id;

    req.session.destroy(async (err) => {
      if (err) {
        res.send({ status: "Error", message: err.message });
      }

      const response = await pool.query("DELETE FROM user_sessions WHERE sid = $1", [id]);

      res.clearCookie("connect.sid");
      res.status(200).send({ status: "success", message: "User has logged out" });
    });
  } catch (err) {
    res.status(404).send({ status: "error", message: err.message });
  }
});

authRouter.put("/update-profile", async (req, res) => {
  try {
    const { firstName, lastName, email, tel, address, city, postcode } = req.body;

    const response = await pool.query(
      "UPDATE users SET first_name = $1, last_name = $2,  phone_number = $3, address = $4, city=$5, postcode=$6 WHERE email = $7 RETURNING *",
      [firstName, lastName, tel, address, city, postcode, email]
    );

    res.status(200).send({
      status: "success",
      message: "Profile Updated Successfully",
      user: response.rows[0],
    });
  } catch (err) {
    res.status(404).send({ status: "Error", message: err.message });
  }
});

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "openid", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.BASE_URL}/login`,
  }),
  function (req, res) {
    res.redirect(`${process.env.CLIENT_URL}`);
    req.session.user = req.user;
  }
);

module.exports = authRouter;
