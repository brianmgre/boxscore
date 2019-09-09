const cron = require("node-cron");
const db = require("../db/db.js");
const axios = require("axios");
require("dotenv").config();
const mlbDb = require("../models/mlb");
const nbaDB = require("../models/nba");

let task = cron.schedule(
  "*/15 * * * * *",
  async () => {
    console.log("now!");
    const nba = await axios.get(
      "https://chumley.barstoolsports.com/dev/data/games/6c974274-4bfc-4af8-a9c4-8b926637ba74.json"
    );

    const mlb = await axios.get(
      "https://chumley.barstoolsports.com/dev/data/games/eed38457-db28-4658-ae4f-4d4d38e9e212.json"
    );

    if (nba.data.away_period_scores.length < 4) {
      addSpace(nba, "away", 4);
    }
    if (nba.data.home_period_scores.length < 4) {
      addSpace(nba, "home", 4);
    }

    if (mlb.data.away_period_scores.length < 9) {
      addSpace(nba, "away", 9);
    }
    if (mlb.data.home_period_scores.length < 9) {
      addSpace(nba, "home", 9);
    }

    nbaDB.replaceOne(
      { league: "NBA" },
      nba.data,
      { upsert: true },
      (err, res) => {
        if (err) throw err;
      }
    );

    mlbDb.replaceOne(
      { league: "MLB" },
      mlb.data,
      { upsert: true },
      (err, res) => {
        if (err) throw err;
      }
    );
    // });
  },
  {
    scheduled: true
  }
);

task.stop();

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
