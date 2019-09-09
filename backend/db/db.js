require("dotenv").config();
// const MongoClient = require("mongodb").MongoClient;

const url = process.env.MONGO_URL;

// // MongoClient.connect(url);

// // module.exports = x.db("sports");

// MongoClient.connect(url, (err, db) => {
//   if (err) throw err;
//   let sport = db.db("sports");
//   // sport
//   //   .collection("bball")
//   //   .replaceOne(
//   //     { league: "NBA" },
//   //     bball.data,
//   //     { upsert: true },
//   //     (err, res) => {
//   //       if (err) throw err;
//   //       console.log(res);
//   //     }
//   //   )
// });

const mongoose = require("mongoose");
mongoose.connect(url, { useNewUrlParser: true });
