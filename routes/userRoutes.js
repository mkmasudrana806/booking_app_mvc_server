const {
  userRegister,
  userLogin,
  userProfile,
  userLogout
} = require("../controllers/userController");

const router = require("express").Router();

// user router
router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/profile", userProfile);
router.post('/logout', userLogout)

module.exports = router;
