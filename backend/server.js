const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const db = require("./config/db");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send({ message: "Welcome to my App" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
