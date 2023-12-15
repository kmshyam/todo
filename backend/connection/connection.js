const mongoose = require("mongoose");

const getConnection = async () => {
  await mongoose.connect(
    "mongodb+srv://kmshyam7991:shyamsrinivasan@Cluster.yxy0sxo.mongodb.net/todo-list?retryWrites=true&w=majority"
  );
  console.log("Connected to database");
};

module.exports = getConnection;
