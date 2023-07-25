// todoRoute.js

const express = require("express");
const router = express.Router();
const todoController = require("./controller");

// Routes for CRUD operations

router.post("/create", todoController.createTodo);
router.get("/getall", todoController.getAllTodos);
router.get("/getOne/:id", todoController.getTodoById);
//router.put("/update/:id", todoController.updateTodo);
router.delete("/delete/:id", todoController.deleteTodo);
router.patch("/update/:id", todoController.updateTodo);
module.exports = router;
