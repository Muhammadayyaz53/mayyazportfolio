import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // auto add createdAt & updatedAt
  }
);

// Prevent model overwrite in Next.js (important)
const User = models.User || model("User", UserSchema);

export default User;