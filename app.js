//packages
const fs = require("fs");
const path = require("path");
const express = require("express");
//unique id packages // object
const uuid = require("uuid");

//to use express function
const app = express();

//ejs template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  /* const htmlFilePath = path.join(__dirname, "views", "index.html");
  res.sendFile(htmlFilePath); */
  //ejs passing files
  res.render("index");

  /* res.send("<h1>Hello world</h1>"); */
});

app.get("/restaurants", function (req, res) {
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  res.render("restaurants", {
    numOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  }); // objects // javascript // array from read json file
});

//dynamic routes
app.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id; // params will hold any dynamic placeholder// here it's id
  //copy of search and read JSON file code
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);
  //look specific id
  for (const searchId of storedRestaurants) {
    if (searchId.id === restaurantId) {
      //remember to specify the property//here it's the id
      return res.render("restaurant-detail", { restaurant: searchId });
      //key=restaurant //passing value=searchId
    }
  }
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4(); //generate uuid //must be in post
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  storedRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

  res.redirect("/confirm"); // load data and prevent warning
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});
app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000);
