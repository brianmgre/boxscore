const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nflSchema = Schema({}, { strict: false });

nfl = module.exports = mongoose.model("nfl", nflSchema);
