const express = require("express");
const mlb = require("../models/mlb");
const nba = require("../models/nba");
const db = require("../db/db");
const router = express.Router();
const cron = require("./node-cron");
let y;

router.get("/mlb", async (req, res) => {
  if (!cron.mlbRunning && !cron.gameOverMlb) {
    taskRunning = true;
    cron.mlbTask.start();
  }

  try {
    const game = await mlb.find({ league: "MLB" });
    res.status(201).json(game);
  } catch (err) {
    console.log(err);
  }
});

router.get("/nba", async (req, res) => {
  if (cron.nbaRunning && !cron.gameOverNba) {
    cron.nbaTask.start();
  }
  try {
    const game = await nba.find({ league: "NBA" });
    res.status(201).json(game);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
