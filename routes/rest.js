//dynamic routes

const express = require("express");
const router = express.Router();

//unique id packages // object
const uuid = require("uuid");
//use resData. pair with imported functions
const resData = require("../utility/restaurant-read-file");

//get list of restaurants
router.get("/restaurants", function (req, res) {
  /*   const filePath = path.join(__dirname, "data", "restaurants.json");
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData); */
  const restaurantsData = resData.getStoredRestaurantsKN(); //crf 1

  res.render("restaurants", {
    numOfRestaurants: restaurantsData.length,
    restaurants: restaurantsData,
  }); // objects // javascript // array from read json file
});

//dynamic routes //restaurant details
router.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id; // params will hold any dynamic placeholder// here it's id
  /*   //copy of search and read JSON file code
    const filePath = path.join(__dirname, "data", "restaurants.json");
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData); */
  const restaurantsData = resData.getStoredRestaurantsKN(); //crf 1

  //look specific id
  for (const searchId of restaurantsData) {
    if (searchId.id === restaurantId) {
      //remember to specify the property//here it's the id
      return res.render("restaurant-detail", { restaurant: searchId });
      //key=restaurant //passing value=searchId
    }
  }

  res.status(404).render("404");
});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

//submit data request
router.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4(); //generate uuid //must be in post
  /*   const filePath = path.join(__dirname, "data", "restaurants.json");
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData); */
  const restaurantsData = resData.getStoredRestaurantsKN(); //crf 1

  restaurantsData.push(restaurant);
  /*   fs.writeFileSync(filePath, JSON.stringify(storedRestaurants)); */
  resData.storeRestaurantsKN(restaurantsData); //crf 2

  res.redirect("/confirm"); // load data and prevent warning
});

module.exports = router;
