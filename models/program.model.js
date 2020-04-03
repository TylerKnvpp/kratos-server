const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProgramSchema = new Schema({
  trainerID: { type: String, required: true },
  category: { type: String, required: true },
  name: { type: String, required: true },
  overview: { type: String, required: true },
  objective: { type: String, required: true },
  duration: { type: String, required: false },
  experienceLevel: { type: String, required: true },
  coverPhoto: { data: Buffer, contentType: String, required: false }
});

module.exports = mongoose.model("Program", ProgramSchema);
