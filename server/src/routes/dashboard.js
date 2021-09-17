const express = require("express");
const router = express.Router();

router.get("/dashboard", (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/login");
  }

  const user = req.user;
  res.render("pages/dashboard", { user });
});

module.exports = router;
