const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
require("dotenv").config();

const app = express();

const connectDB = require("./config/db");

connectDB();


app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.post("/test", (req, res) => {
  res.json({
    message: "POST route working"
  });
});

app.get("/", (req, res) => {
  res.send("Server Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});