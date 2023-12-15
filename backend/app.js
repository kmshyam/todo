const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connection = require("./connection/connection");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/user-route");
const todoRoutes = require("./routes/todo-route");

const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

connection()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
  })
  .catch(() => {
    console.log("Failed to connect to database!");
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );
  next();
});

app.use("/users", userRoutes);
app.use("/todo", todoRoutes);
