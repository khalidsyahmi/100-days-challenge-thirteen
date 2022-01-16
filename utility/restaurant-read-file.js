//crash will happen if not required
const fs = require("fs");
const path = require("path");

//moving this line outside to make it available to all fucntions
//.. denotes up one level in directory
const filePath = path.join(__dirname, "..", "data", "restaurants.json");

//read
function getStoredRestaurants() {
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  return storedRestaurants; // return that parsed file data to anywhere
}

//write
function storeRestaurants(storableRest) {
  fs.writeFileSync(filePath, JSON.stringify(storableRest)); //filepath is a const inside a function
}

//exposure as key names //function names in other files
module.exports = {
  getStoredRestaurantsKN: getStoredRestaurants,
  storeRestaurantsKN: storeRestaurants,
};
