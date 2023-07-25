const mongoose = require("mongoose");

const uri = "mongodb://localhost/todoapp";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("Error in database connection:", error);
});

db.once("open", () => {
  console.log("Connected to the database");
});

db.on("disconnected", () => {
  console.log("Disconnected from the database");
});

module.exports = db;
