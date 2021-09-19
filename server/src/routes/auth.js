const express = require("express");
const router = express.Router();
const path = require("path");
const passport = require("passport");

router.get("/login", (req, res) => {
  console.log("loginnnned");
  res.render("pages/login.ejs");
});

//New Implementation of Auth
// auth with google+
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  // res.send(req.user);
  res.redirect("/feedback");
});

// auth logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

module.exports = router;
