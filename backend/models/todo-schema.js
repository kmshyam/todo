const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoDetailsSchema = new Schema({
  todo: { type: String, required: true },
  status: { type: String, required: true },
});

const todoSchema = new Schema(
  {
    userID: { type: String, required: true },
    username: { type: String, required: true },
    todo_id: { type: String, required: true },
    todo: { type: todoDetailsSchema, required: true },
  },
  { timestamps: true }
);

const todoModel = mongoose.model("Todo", todoSchema);

module.exports = todoModel;
