import mongoose from "mongoose";

const codeReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    summary: {
      type: String,
      default: "",
    },
    bugs: {
      type: [String],
      default: [],
    },
    issues: {
      type: [String],
      default: [],
    },
    suggestions: {
      type: [String],
      default: [],
    },
    complexity: {
      time: { type: String, default: "N/A" },
      space: { type: String, default: "N/A" },
    },
    explanation: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const CodeReview = mongoose.model("CodeReview", codeReviewSchema);

export default CodeReview;
