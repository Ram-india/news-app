import mongoose from "mongoose";

const preferenceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  categories: {
    type: [String],
    default: [],
  },
  frequency: {
    type: String,
    enum: ["realtime", "hourly", "daily"],
    default: "realtime",
  },
});

const Preference =  mongoose.model("Preference", preferenceSchema);

export default Preference;