import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true, // Removes extra spaces
    },
    collegeId: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate college IDs
    },
    role: {
      type: String,
      enum: ["student", "Professor", "Head_of_Department", "Academic_Coordinator"], // Restricts values
      required: true,
      default: "student", 
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const User = mongoose.model("User", userSchema);

export default User;
