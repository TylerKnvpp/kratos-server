const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EquipmentSchema = new Schema({
  type: { type: String, required: true }
});

module.exports = mongoose.model("Equipment", EquipmentSchema);
