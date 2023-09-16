const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
require("dotenv").config();
// secret
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "dslkfjsdfsdlfjslkdafhakfjsd23423jlkksdf";

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  // create a user with schema
  const newUser = new User({
    name,
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
  });
  // save user to the database
  try {
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.json("error while register");
    console.error("Error saving user:", err);
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id, name: userDoc.name },
        jwtSecret,
        {},
        (error, token) => {
          if (error) throw error;
          res.cookie("token", token).status(200).json(userDoc);
        }
      );
    } else {
      res.status(422).json("password not ok");
    }
  } else {
    res.json("user not found");
  }
};

const userProfile = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const userDoc = await User.findById(user.id);
      res.json(userDoc);
    });
  } else {
    res.json("token not found!");
  }
};

const userLogout = async (req, res) => {
  res.json(true);
};
module.exports = {
  userRegister,
  userLogin,
  userProfile,
  userLogout,
};
