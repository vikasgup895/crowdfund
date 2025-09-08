const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Example register controller
exports.register = async (req, res) => {
  try {
    const { firstName, email, password } = req.body;
    console.log("Registration request body:", req.body); // ✅ Debug log

    if (!firstName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check existing user
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create new user
    user = new User({ firstName, email, password, role: "backer" }); // Default role as backer
    await user.save();

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });

    res.status(201).json({
      message: "User registered",
      token,
      user: {
        id: user._id,
        _id: user._id, // Include both for compatibility
        firstName: user.firstName,
        name: user.firstName, // Add name field for compatibility
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};
