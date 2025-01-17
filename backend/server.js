const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes")

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/auth", authRoutes)

app.get("/", (req, res) => {
  res.send({ message: "Welcome to my App" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
