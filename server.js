const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB=require('./config/db')
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");

   
dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/cart", cartRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});