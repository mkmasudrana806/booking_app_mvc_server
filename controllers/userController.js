const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// secret
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = require("crypto").randomBytes(64).toString("hex");

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
    res.send(savedUser);
    console.log("User saved successfully:", savedUser);
  } catch (err) {
    res.send("error while register");
    console.error("Error saving user:", err);
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passwordCheck = bcrypt.compareSync(password, userDoc.password);
      if (passwordCheck) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          jwtSecret,
          {},
          (error, token) => {
            if (error) throw error;
            res.cookie("token", token).status(200).send(true);
          }
        );
      } else {
        res.send(false);
      }
    } else {
      res.send(false);
    }
  } catch (error) {
    console.log("error while user login in server");
  }
};

module.exports = {
  userRegister,
  userLogin,
};
