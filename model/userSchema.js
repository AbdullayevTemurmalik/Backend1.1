const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  firstname: { type: String, default: "" },
  lastname: { type: String, default: "" },
  birthday: { type: String },
  gender: { type: String, enum: ["male", "female"], alias: "jinsi" },
  address: { type: String, default: "" },
  phone: { type: String, default: "" },
  house_id: { type: Schema.Types.ObjectId, ref: "House" },
  edu_id: { type: Schema.Types.ObjectId, ref: "Edu" },
  car_id: { type: Schema.Types.ObjectId, ref: "car" },
  book_id: { type: Schema.Types.ObjectId, ref: "Book" },
});

const User = model("User", userSchema);
module.exports = { User };
