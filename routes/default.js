//static routes

const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  /* const htmlFilePath = path.join(__dirname, "views", "index.html");
      res.sendFile(htmlFilePath); */
  //ejs passing files
  res.render("index");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

router.get("/about", function (req, res) {
  res.render("about");
});

module.exports = router;
