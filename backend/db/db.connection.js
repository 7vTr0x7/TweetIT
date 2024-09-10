require("dotenv").config({ path: "D:/tweetit/backend/.env" });
const mongoose = require("mongoose");

const mongoUrl = process.env.MONGODB;

const initializeDatabase = async () => {
  try {
    const connection = await mongoose.connect(mongoUrl);
    if (connection) {
      console.log(`Connected successfully`);
    }
  } catch (error) {
    console.log(`Failed to connect to MONGODB ${error}`);
  }
};

module.exports = { initializeDatabase };
