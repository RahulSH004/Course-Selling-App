const mongoose = require("mongoose");
require("dotenv").config();
console.log("connected");
mongoose.connect(process.env.MONGO_URL);