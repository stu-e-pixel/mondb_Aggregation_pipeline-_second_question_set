const mongoose = require("mongoose");
const Dbconnect = async () => {
  try {
    const connection = mongoose.connect(process.env.MONGO_URL);
    if (connection) {
      console.log("mongodb connected succefully");
    } else {
      console.log("mongoDb is not connected");
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = Dbconnect;
