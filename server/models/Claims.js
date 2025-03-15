const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes unnecessary spaces
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true, // Ensures emails are stored in lowercase
      match: [/.+\@.+\..+/, "Please enter a valid email"], // Email validation
    },
    claimAmount: {
      type: Number,
      required: true,
      min: [1, "Claim amount must be at least 1"], // Ensures valid claim amounts
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    imgUrl: {
      type: String,
      required: true, // Ensures a document is uploaded
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"], // Restricts values to predefined options
      default: "Pending",
    },
    submissionDate: {
      type: Date,
      default: Date.now, // Auto-timestamp
    },
    approvedAmount: {
      type: Number,
      default: null, // Initially, no amount is approved
    },
    insurerComments: {
      type: String,
      default: "",
      trim: true, // Removes unnecessary spaces
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt fields automatically
);

module.exports = mongoose.model("Claim", claimSchema);
