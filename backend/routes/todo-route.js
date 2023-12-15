const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  postTodo,
  editTodo,
  deleteTodo,
  completeTodo,
  revertTodo,
} = require("../controllers/todoController");

router.get("/all", getAllTodos);

router.post("/add", postTodo);

router.put("/edit", editTodo);

router.delete("/delete", deleteTodo);

router.put("/complete", completeTodo);

router.put("/revert", revertTodo);

module.exports = router;
