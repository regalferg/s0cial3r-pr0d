const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedSchema = new Schema({
  poster: { type: String, required: true },
  link: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Feed = mongoose.model("feeds", feedSchema);

module.exports = Feed;
