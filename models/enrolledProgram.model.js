const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EnrolledProgramSchema = new Schema({
  programID: { type: String, required: true },
  userID: { type: String, required: true }
});

module.exports = mongoose.model("Enrolled", EnrolledProgramSchema);
