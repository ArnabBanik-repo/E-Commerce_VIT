const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user");

// const CLIENT_URL = "http://localhost:3000";

router.get("/login/success", async (req, res) => {
  if (req.user) {
    const user = await User.findOne({ email: req.user._json.email })
      .populate("interests")
      .populate("listedItems");
    // console.log(user);
    // const user = { ...req.user, ...dbUser };
    res.status(200).json({
      status: "succss",
      user,
    });
  } else {
    res.status(401).json({
      err: "no user",
    });
  }
});

router.get("/logout", (req, res) => {
  req.logOut(() => {
    res.redirect(process.env.CLIENT_URL);
  });
});

router.get("/login/failed", (req, res) => {
  res.json({
    status: "fail",
    err: "login failed",
  });
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    hostedDomain: "vitstudent.ac.in",
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
