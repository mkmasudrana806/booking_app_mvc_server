const jwt = require("jsonwebtoken");
const Place = require("../models/Place");
const jwtSecret = "dslkfjsdfsdlfjslkdafhakfjsd23423jlkksdf";

// new place create in accomodation
const newPlaceCreate = async (req, res) => {
  const { token } = req.cookies;
  const { placeData } = req.body;


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
      price: placeData.price,
    });
    try {
      const savePage = await newPage.save();
      res.status(200).json(savePage);
    } catch (error) {
      console.log(error);
    }
  });
};

// get all places specified user has access
const userAllPlaces = async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) throw err;
    const { id } = user;
    try {
      const places = await Place.find({ owner: id });
      res.json(places);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while fetching data from the database",
      });
    }
  });
};

// get single place by id
const singlePlace = async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
};

// update single place by id
const updateSinglePlace = async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  const { placeData } = req.body;
  const foundDoc = await Place.findById(id);

  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) throw err;
    const { id } = user;
    if (foundDoc.owner.toString() === id) {
      const updatedDoc = {
        $set: {
          owner: id,
          title: placeData.title,
          address: placeData.address,
          photos: placeData.addedPhoto,
          description: placeData.description,
          perks: placeData.perks,
          extraInfo: placeData.extraInfo,
          checkIn: placeData.checkIn,
          checkOut: placeData.checkOut,
          maxGuests: placeData.maxGuests,
          price: placeData.price,
        },
      };
      try {
        const updated = await Place.findByIdAndUpdate(
          foundDoc._id,
          updatedDoc,
          {
            new: true,
          }
        );
        res.json(updated);
      } catch (error) {
        console.error(error);
      }
    }
  });
};

// get allPlaces data
const allPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching data from the database",
    });
  }
};

module.exports = {
  newPlaceCreate,
  userAllPlaces,
  singlePlace,
  updateSinglePlace,
  allPlaces,
};
