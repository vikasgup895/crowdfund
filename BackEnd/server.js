const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3001",  // Adjust frontend URL
  credentials: true
}));

//jwt
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};


app.use(cookieParser());
// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));


app.post("/api/auth/signup", async (req, res) => {
const { name, email, password } = req.body;

try {
 // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Create new user

  const newUser = new User({ name, email, password });
  
  await newUser.save();

  // Generate Token
  const token = generateToken(newUser._id);

  res.status(201).json({
    _id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    token,
  });

} catch (error) {
  res.status(500).json({ message: "Server error", error: error.message });
}
})


app.use("/api/auth", authRoutes);

app.use("/api", campaignRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Crowdfunding API is running!");
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
