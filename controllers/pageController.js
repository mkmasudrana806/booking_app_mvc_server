const jwt = require("jsonwebtoken");
const Place = require("../models/Place");
const jwtSecret = "dslkfjsdfsdlfjslkdafhakfjsd23423jlkksdf";

// accomodate new page create controller
const accomodationNewPage = async (req, res) => {
  const { token } = req.cookies;
  const { placeData } = req.body;

  console.log("link photo is", placeData.addedPhoto);

  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) throw err;
    const newPage = new Place({
      owner: user.id,
      title: placeData.title,
      address: placeData.address,
      photos: placeData.addedPhoto,
      description: placeData.description,
      perks: placeData.perks,
      extraInfo: placeData.extraInfo,
      checkIn: placeData.checkIn,
      checkOut: placeData.checkOut,
      maxGuests: placeData.maxGuests,
    });
    try {
      const savePage = await newPage.save();
      res.status(200).json(savePage);
    } catch (error) {
      console.log(error);
    }
  });
};

// all places of accomodation are viewing
const allPlaces = async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) throw err;
    const { id } = user;
    res.json(await Place.find({ owner: id }));
  });
};

// single place of accomodation by id
const singlePlace = async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
};
module.exports = {
  accomodationNewPage,
  allPlaces,
  singlePlace,
};
