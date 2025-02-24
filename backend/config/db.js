const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongoURL = process.env.MONGO_URL;

mongoose
  .connect(mongoURL) // for docker container
  // for windows .connect(mongodb://127.0.0.1:27017/Ecommerce-App)
  // for mac .connect("mongodb://localhost:27017/merndb")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error in connection with MongoDB ", err.message);
  });

mongoose.connection.on("error", (err) => {
  console.log("Runtime error upon connecting to MongoDB ", err.message);
});

module.exports = mongoose;
