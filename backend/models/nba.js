const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nbaSchema = Schema({}, { strict: false });

nba = module.exports = mongoose.model("nba", nbaSchema);
