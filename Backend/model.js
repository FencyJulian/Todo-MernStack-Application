// models/todoModel.js
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["completed", "pending","incomplete"],
    default: "incomplete",
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
