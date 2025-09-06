require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("./config/db");
const multer = require("multer");
const path = require("path");

const authRoutes = require("./routes/auth");
const campaignRoutes = require("./routes/campaigns");
const contributionRoutes = require("./routes/contributions");
const uploadRoutes = require("./routes/upload");

const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/contributions", contributionRoutes);
app.use("/api/upload", uploadRoutes);

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large. Maximum size is 5MB",
      });
    }
  }
  next(error);
});
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port  ${PORT}`);
  console.log("http://localhost:5000");
});
