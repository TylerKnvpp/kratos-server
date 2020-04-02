const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoalSchema = new Schema({
  userID: { type: String, required: true },
  goal: { type: String, required: true }
});

module.exports = mongoose.model("Goal", GoalSchema);
