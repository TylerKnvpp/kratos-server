const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  description: { type: String, required: true }
});

module.exports = mongoose.model("Category", CategorySchema);
