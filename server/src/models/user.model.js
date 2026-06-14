import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user", "recruiter"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
