require("dotenv").config();

const url = process.env.MONGO_URL;

const mongoose = require("mongoose");
mongoose.connect(url, { useNewUrlParser: true });
