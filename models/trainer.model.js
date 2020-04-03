const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrainerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  specialty: { type: String, required: true },
  sex: { type: String, required: true },
  gym: { type: String, required: false },
  experience: { type: String, required: true },
  bio: { type: String, required: true },
  sportsPlayed: { type: String, required: true },
  picture: { data: Buffer, contentType: String, required: false }
});

module.exports = mongoose.model("Trainer", TrainerSchema);
