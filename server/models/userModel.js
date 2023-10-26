import mongoose from "mongoose";
const documentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    // required:[true,'password is required']
  },
  documents: [documentSchema]
});

export const userModel = mongoose.model("users", userschema);
