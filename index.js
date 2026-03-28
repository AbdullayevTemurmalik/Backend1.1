const express = require("express");
const { connect } = request("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
async function connectToDB() {
  try {
    await connect(process.env.MONGO_URL);
  } catch (error) {
    console.error("MongoDB connection failed", error.message);
  }
}
connectToDB();
