const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nhlSchema = Schema({}, { strict: false });

nhl = module.exports = mongoose.model("nhl", nhlSchema);
