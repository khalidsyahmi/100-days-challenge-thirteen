//packages
/* fs to restaurant-read-file.js */
const path = require("path");
const express = require("express");

//uuid to rest.js
//restData to rest.js

//Express router splitting
const defaultRoutes = require("./routes/default");
const defaultRests = require("./routes/rest");

//to use express function
const app = express();

//ejs template engine
app.set("views", [
  path.join(__dirname, "views"),
  path.join(__dirname, "views/includes"),
  path.join(__dirname, "views/errors"), //multiple template views //render methods
]);
app.set("view engine", "ejs");

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

/* rest.js */

/* default.js */

app.use("/", defaultRoutes); // /active for all incoming requests
app.use("/", defaultRests); //some explanations needed

//404 error middleware
app.use(function (req, res) {
  res.status(404).render("404");
});

//500 error middleware //special error handling
app.use(function (error, req, res, next) {
  res.status(500).render("500");
});

app.listen(3000);
