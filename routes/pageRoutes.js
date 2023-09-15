const {
  accomodationNewPage,
  allPlaces,
  singlePlace,
} = require("../controllers/pageController");

const router = require("express").Router();

router.post("/accomodation/new", accomodationNewPage);
router.get("/places", allPlaces);
router.get("/places/:id", singlePlace);

module.exports = router;
