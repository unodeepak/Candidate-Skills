const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const DB_URL = process.env.DB_URL;
    await mongoose.connect(DB_URL, {});
    console.log("Database connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
