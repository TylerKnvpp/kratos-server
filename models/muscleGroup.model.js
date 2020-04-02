const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MuscleGroupSchema = new Schema({
  type: { type: String, required: true }
});

module.exports = mongoose.model("Muscle", MuscleGroupSchema);
