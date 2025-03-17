const express = require("express");
const { loginUser, logoutUser } = require("../controllers/authController");

const router = express.Router();

//sign up
router.post("/signup", async (req, res) => {
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
}
);

// Login Route
router.post("/login", loginUser);

// Logout Route
router.post("/logout", logoutUser);

module.exports = router;
