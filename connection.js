const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

async function connectMongoDb(url) {
  return await mongoose.connect(url);
}

module.exports = {
  connectMongoDb,
};
