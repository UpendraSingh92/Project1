const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      required: true,
      enum: ["Admin", "Student", "Instructor"],
    },
    image: {
      type: String,
      required: true,
    },
    additionalDetail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    course: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    courseProgress: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseProgress",
      },
    ],
    token: {
      type: String,
    },
    tokenExpire: {
      type: Date,
    },
  },
  // Add timestamps for when the document is created and last modified
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
