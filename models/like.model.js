const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  exerciseID: { type: String, required: true },
  userID: { type: String, required: true }
});

module.exports = mongoose.model("Like", LikeSchema);
