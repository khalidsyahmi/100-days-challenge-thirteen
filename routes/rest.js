//dynamic routes //all related to restaurants

const express = require("express");
const router = express.Router();

//unique id packages // object
const uuid = require("uuid");
//use resData. pair with imported functions
const resData = require("../utility/restaurant-read-file");

//get list of restaurants
router.get("/restaurants", function (req, res) {
  let order = req.query.order; //optional? /check if any order key is available
  let nextOrder = "desc";
  /*   const filePath = path.join(__dirname, "data", "restaurants.json");
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData); */
  //if the value in input property is not set yet
  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }
  // ??
  if (order === "desc") {
    nextOrder = "asc";
  }

  const restaurantsData = resData.getStoredRestaurantsKN(); //crf 1

  //query for sorting asc and desc
  restaurantsData.sort(function (restA, restB) {
    if (
      (order === "asc" && restA.name > restB.name) ||
      (order === "desc" && restB.name > restA.name)
    ) {
      return 1;
    }
    return -1;
  }); //.sort() method // name alphabetically ascending order

  res.render("restaurants", {
    numOfRestaurants: restaurantsData.length,
    restaurants: restaurantsData,
    changeOrder: nextOrder, // changeOrder key exposed to the template in ejs file
  }); // objects // javascript // array from read json file
});

//dynamic routes //restaurant details
router.get("/restaurants/:id", function (req, res) {
  // params will hold any dynamic placeholder// here it's id
  const restaurantId = req.params.id;

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

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
