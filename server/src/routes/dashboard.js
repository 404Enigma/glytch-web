const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const { getReviews, add_feedback, getFeedbacks } = require("../services/reviews");

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

router.get("/feedback", async (req, res) => {
  console.log("feedback");

  if (!req.user) {
    return res.redirect("/auth/login");
  }

  const user = req.user;
  const feedback_data = await getFeedbacks();

  res.render("pages/feedback", { user, feedback_data });
});

router.post("/feedback_string", async (req, res) => {
  const feedback_obj = req.body;
  await add_feedback(feedback_obj);
  res.send("success");
});

router.post("/getCategory", async (req, res) => {
  const { text } = req.body;

  const res_data = await axios.post(process.env.Feedback_API_URL, {
    text,
  });
  const data = res_data.data;

  res.send(data);
});

module.exports = router;
