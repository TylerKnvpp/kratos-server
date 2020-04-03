const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  dayID: { type: String, required: true },
  equipmentID: { type: String, required: false },
  muscleGroupID: { type: String, required: false },
  name: { type: String, required: true },
  overview: { type: String, required: true },
  reps: { type: Number, required: false },
  sets: { type: Number, required: true },
  time: { type: Number, required: false },
  tips: { type: String, required: false },
  coverPhoto: { data: Buffer, contentType: String, required: false },
  video: { data: Buffer, contentType: String, required: false },
  videoURL: { type: String, required: false }
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
