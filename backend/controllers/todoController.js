const jwt = require("jsonwebtoken");
const TodoModel = require("../models/todo-schema");

const SECRET_CODE = process.env.JWT_SECRET;

const { randomFiveDigitInteger } = require("../utils/utils");

const getUserByToken = (token) => {
  return new Promise((res, rej) => {
    if (token) {
      let userDetail;
      try {
        userDetail = jwt.verify(token, SECRET_CODE);
        res(userDetail);
      } catch (error) {
        rej("Please enter a valid token!");
      }
    } else {
      rej("Token not found!");
    }
  });
};

exports.getAllTodos = async (req, res) => {
  try {
    const user = await getUserByToken(req.headers.authorization);
    if (user) {
      try {
        const todos = await TodoModel.find().sort({ _id: -1 });
        res.send({
          status: "Success",
          message: "Todos fetched successfully",
          todos,
        });
      } catch (error) {
        res.status(500).json({
          status: "Failed",
          message: error.message,
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.postTodo = async (req, res) => {
  try {
    const user = await getUserByToken(req.headers.authorization);
    if (user) {
      try {
        const todoInfo = {
          todo: req.body.todo,
          status: req.body.status,
        };
        const data = {
          userID: user.userID,
          username: user.username,
          todo_id: `TD${randomFiveDigitInteger()}`,
          todo: todoInfo,
        };
        const newTodoInfo = await TodoModel.create(data);
        res.status(200).json({
          status: "Success",
          message: "Todo added successfully",
          newTodoInfo,
        });
      } catch (error) {
        res.status(400).json({
          status: "Failed",
          message: error.message,
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.editTodo = async (req, res) => {
  const user = await getUserByToken(req.headers.authorization);
  const id = { todo_id: req.query.todoId };
  const update = { "todo.todo": req.query.todo };
  if (user) {
    try {
      await TodoModel.updateOne(id, { $set: update });
      res.status(200).json({
        status: "Success",
        message: "Todo updated successfully.",
      });
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        message: err.message,
      });
    }
  } else {
    res.status(400).json({
      status: "Failed",
      message: "Please login to update todo!",
    });
  }
};

exports.deleteTodo = async (req, res) => {
  const user = await getUserByToken(req.headers.authorization);
  const id = { todo_id: req.query.todoId };
  if (user) {
    try {
      await TodoModel.deleteOne(id);
      res.status(200).json({
        status: "Success",
        message: "Todo deleted successfully.",
      });
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        message: err.message,
      });
    }
  } else {
    res.status(400).json({
      status: "Failed",
      message: "Please login to delete todo!",
    });
  }
};

exports.completeTodo = async (req, res) => {
  const user = await getUserByToken(req.headers.authorization);
  const id = { todo_id: req.query.todoId };
  const update = { "todo.status": "Completed" };
  if (user) {
    try {
      await TodoModel.updateOne(id, { $set: update });
      res.status(200).json({
        status: "Success",
        message: "Todo completed successfully.",
      });
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        message: err.message,
      });
    }
  } else {
    res.status(400).json({
      status: "Failed",
      message: "Please login to update todo!",
    });
  }
};

exports.revertTodo = async (req, res) => {
  const user = await getUserByToken(req.headers.authorization);
  const id = { todo_id: req.query.todoId };
  const update = { "todo.status": "Pending" };
  if (user) {
    try {
      await TodoModel.updateOne(id, { $set: update });
      res.status(200).json({
        status: "Success",
        message: "Todo reverted successfully.",
      });
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        message: err.message,
      });
    }
  } else {
    res.status(400).json({
      status: "Failed",
      message: "Please login to update todo!",
    });
  }
};
