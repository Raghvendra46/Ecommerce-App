const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const db = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

app.use(
  cors({
    // origin: "http://localhost:5173", (for local)
    origin: "https://3.108.99.154:5173", // (for aws)
    methods: "GET, POST, PUT, DELETE",
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use("/auth", authRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
