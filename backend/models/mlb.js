const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mlbSchema = Schema({}, { strict: false });

mlb = module.exports = mongoose.model("mlb", mlbSchema);
