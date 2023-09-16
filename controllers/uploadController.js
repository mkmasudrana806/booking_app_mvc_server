const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const pathModule = require("path");

// upload the image by link
const uploadPhotoByLink = async (req, res) => {
  const { link } = req.body;
  const filename = Date.now() + ".jpeg";
  const options = {
    url: link,
    dest:
      "D:/Practice Projects/Full Stack Projects/airbnb clone/Booking App/Booking_App/booking_app_server_mvc/uploads/photos/" +
      filename,
  };
  await imageDownloader
    .image(options)
    .then(({ filepath }) => {
      res.json(filename);
    })
    .catch((err) => console.error("Erro", err));
};

// copied from chagpt
// Set up multer for handling file uploads
const photosMiddleware = multer({
  dest: "uploads/photos",
}).array("photos", 100); // Assuming you're uploading up to 100 photos at once

// Define the route handler for uploading photos from the local machine

const uploadPhotoFromLocal = async (req, res) => {
  const files = req.files;
  const uploadedFiles = [];
  for (let i = 0; i < files.length; i++) {
    const { path, filename, originalname } = files[i];
    // const parts = originalname.split(".");
    const ext = pathModule.extname(originalname); // pathmodule method from path module
    // const ext = parts[parts.length - 1];
    const newPath = path + ext; // Concatenate the path and extension
    fs.renameSync(path, newPath);
    uploadedFiles.push(filename + ext);
  }
  res.json(uploadedFiles);
};
// const uploadPhotoFromLocal = async (req, res) => {
//   const files = req.files;
//   console.log(files);
//   try {
//     const uploadedFiles = [];
//     for (let i = 0; i <files.length; i++) {
//       const {path, filename, originalname } = files[i];
//       const parts = originalname.split(".");
//       const ext = parts[parts.length - 1];
//       const newfilename = filename + "." + ext;
//       uploadedFiles.push(newfilename);

//     //   const { path, orginalname } = req.files[i];

//     const newPath = path + "." + ext;
//     console.log('newPath', newPath);
//     // fs.renameSync(path, newPath);
//     // uploadedFiles.push(newPath);
//     }
//     console.log("Uploaded files:", uploadedFiles);
//     res.json(uploadedFiles);
//   } catch (error) {
//     console.error("Error uploading photos:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// // upload photo from local machine
// const photosMiddleware = multer({
//   dest: "uploads/photos",
// }).array("photos", 100);

// const uploadPhotoFromLocal = async (req, res) => {
//   const uploadedFiles = [];
//   for (let i = 0; i < req.files.length; i++) {
//     const { path, orginalname } = req.files[i];
//     const parts = orginalname.split(".");
//     const ext = parts[parts.length - 1];
//     const newPath = path + "." + ext;
//     fs.renameSync(path, newPath);
//     uploadedFiles.push(newPath);
//   }
//   console.log("Uploaded files: " + uploadedFiles);
//   res.json(uploadedFiles);
// };
module.exports = {
  uploadPhotoByLink,
  uploadPhotoFromLocal,
  photosMiddleware,
};
