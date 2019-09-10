const cron = require("node-cron");
const db = require("../db/db.js");
const axios = require("axios");
require("dotenv").config();
const mlbDb = require("../models/mlb");
const nbaDB = require("../models/nba");

let mlbRunning = false;
let nbaRunning = false;
let gameOverMlb = false;
let gameOverNba = false;

let nbaTask = cron.schedule(
  "*/15 * * * * *",
  async () => {
    const nba = await axios.get(`${process.env.NBA_URL}`);

    if (nba.data.away_period_scores.length < 4) {
      addSpace(nba, "away", 4);
    }
    if (nba.data.home_period_scores.length < 4) {
      addSpace(nba, "home", 4);
    }

    nbaDB.replaceOne(
      { league: "NBA" },
      nba.data,
      { upsert: true },
      (err, res) => {
        if (err) throw err;
      }
    );

    //comment out if you want cron to run
    if (nba.data.event_information.status === "completed") {
      gameOverNba = true;
      nbaTask.stop();
    }
  },
  {
    scheduled: true
  }
);

let mlbTask = cron.schedule(
  "*/15 * * * * *",
  async () => {
    const mlb = await axios.get(`${process.env.MLB_URL}`);
    if (mlb.data.away_period_scores.length < 9) {
      addSpace(nba, "away", 9);
    }
    if (mlb.data.home_period_scores.length < 9) {
      addSpace(nba, "home", 9);
    }

    mlbDb.replaceOne(
      { league: "MLB" },
      mlb.data,
      { upsert: true },
      (err, res) => {
        if (err) throw err;
      }
    );

    //comment out if you want to the cron to run
    if (mlb.data.event_information.status === "completed") {
      gameOverMlb = true;
      mlbTask.stop();
    }
  },
  {
    scheduled: true
  }
);

function addSpace(league, location, num) {
  if (location === "home") {
    while (league.data.home_period_scores.length !== num) {
      league.data.home_period_scores.push("");
    }
  } else {
    while (league.data.away_period_scores.length !== num) {
      league.data.away_period_scores.push("");
    }
  }
}

module.exports = {
  mlbRunning,
  nbaRunning,
  mlbTask,
  nbaTask,
  gameOverMlb,
  gameOverNba
};
