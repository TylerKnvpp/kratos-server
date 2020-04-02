const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DaySchema = new Schema({
  programID: { type: String, required: true },
  categoryID: { type: String, required: true },
  equipmentID: { type: String, required: false },
  name: { type: String, required: true },
  overview: { type: String, required: true },
  coverPhoto: { data: Buffer, contentType: String, required: false }
});

module.exports = mongoose.model("Day", DaySchema);
