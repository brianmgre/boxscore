const express = require("express");
const mlb = require("../models/mlb");
const nba = require("../models/nba");
const db = require("../db/db");
const router = express.Router();

router.get("/mlb", async (req, res) => {
  const game = await mlb.find({ league: "MLB" });
  res.status(201).json(game);
});

router.get("/nba", async (req, res) => {
  try {
    const game = await nba.find({ league: "NBA" });
    res.status(201).json(game);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
