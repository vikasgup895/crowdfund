const express = require("express");
const router = express.Router();
const { register, login, profile } = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");

router.post("/register", register);
router.post("/login", login);
// router.get("/profile", auth, profile);
router.get("/logout", (_req, res) => {
  res.json({ message: "Logged out" });
});
// Add check route
router.get("/check", auth, (req, res) => {
  const u = req.user; // set by auth middleware
  res.json({
    authenticated: true,
    user: {
      id: u._id,
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      role: u.role,
    },
  });
});

// Add profile/me route
router.get("/me", auth, async (req, res) => {
  res.json(req.user);
});

router.post("/profile", auth, async (req, res, next) => {
  try {
    const { firstName, lastName, role, bio } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.firstName = firstName;
    user.lastName = lastName;
    user.role = role;
    user.bio = bio;
    await user.save();

    res.status(200).json({ message: "Profile updated", user });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
