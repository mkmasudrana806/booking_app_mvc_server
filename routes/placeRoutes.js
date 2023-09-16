const {
  newPlaceCreate,
  userAllPlaces,
  singlePlace,
  updateSinglePlace,
  allPlaces
} = require("../controllers/placeController");

const router = require("express").Router();

router.post("/new", newPlaceCreate);
router.get("/user-places", userAllPlaces);
router.get("/user-places/:id", singlePlace);
router.put("/update/:id", updateSinglePlace);
router.get("/places", allPlaces);

module.exports = router;
