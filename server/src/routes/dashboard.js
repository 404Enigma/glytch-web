const express = require("express");
const router = express.Router();

const { getReviews } = require("../services/reviews");

router.get("/dashboard", async (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/login");
  }

  const reviews_data = await getReviews();

  //   reviews_data.map((review) => {
  //     console.log(review);
  //   });

  const user = req.user;
  res.render("pages/dashboard", { user, reviews_data });
});

module.exports = router;
