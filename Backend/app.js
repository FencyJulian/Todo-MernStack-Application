const db = require("./db.js");
const express = require("express");
const routes = require("./route");
const cors = require("cors"); // Import the cors package

const app = express();

app.use(cors()); // Use the cors middleware to enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/app", routes);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
