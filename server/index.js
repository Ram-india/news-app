
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

// Routes
const authRoutes = require("./routes/authRoutes");
const preferenceRoutes = require("./routes/preferenceRoutes");

// Initialize Express app
const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB

connectDB();

//Test Route
app.get('/', (req, res) => {
  res.send('News -App Backend is running...');
});

// Route Mapping
app.use("/api/auth", authRoutes);
app.use("/api/preferences", preferenceRoutes);


//server start  

const PORT = process.env.PORT || 5000;
app.listen(PORT , () => {
  console.log(`Server is running on port ${PORT}`);
});

