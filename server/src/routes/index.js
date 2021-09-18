const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("home");
  res.send("Glytch");
});

router.use("/auth", require("./auth"));
router.use(require("./dashboard"));

module.exports = router;
