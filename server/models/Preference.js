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

export default mongoose.model("Preference", preferenceSchema);
