const {
  userRegister,
  userLogin,
} = require("../controllers/userController");

const router = require("express").Router();

// user router
router.post("/register", userRegister);
router.post("/login", userLogin);

module.exports = router;
