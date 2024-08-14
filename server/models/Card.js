import mongoose from "mongoose";

const CardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
      required: false,
    },
    expectations: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      default: "isAwaiting",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    todos: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Card", CardSchema);
