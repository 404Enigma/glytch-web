const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    console.log("home");
    res.render("pages/home");
});
router.get("/feedback", (req, res) => {
    console.log("feedback");
    res.render("pages/feedback");
});

router.use("/auth", require("./auth"));
router.use(require("./dashboard"));

module.exports = router;
