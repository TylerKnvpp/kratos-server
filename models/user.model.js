const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  sex: { type: String, required: true },
  sportsPlayed: { type: String, required: true },
  experienceLevel: { type: String, required: true },
  picture: { data: Buffer, contentType: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model("User", UserSchema);
