const {
  uploadPhotoByLink,
  uploadPhotoFromLocal,
  photosMiddleware,
} = require("../controllers/uploadController");

const router = require("express").Router();

router.post("/photo-by-link", uploadPhotoByLink);
router.post("/photo-from-local", photosMiddleware, uploadPhotoFromLocal);

module.exports = router;
