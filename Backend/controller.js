// todoController.js

const Todo = require("./model");

// Controller functions for CRUD operations

// Create a new todo item
const createTodo = async (req, res) => {
  try {
    
    const { title, description} = req.body;
    console.log(req.body); // Check if the request data is received correctly
    
    const currentDate = new Date();
    const newTodo = await Todo.create({
      title,
      description,
      status: currentDate < new Date() ? "pending" : "incomplete",
      date: currentDate,
    });  console.log(newTodo); // Check the newly created todo
   
    res.status(201).json(newTodo);
  } catch (err) {
    console.error("Error creating todo item:", err);
    res
      .status(500)
      .json({ message: "Error creating todo item", error: err.message });
  }
};


// Read all todo items
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching todo items", error: err.message });
  }
};

// Read a single todo item by ID
const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching todo item", error: err.message });
  }
};

// Update a todo item

  const updateTodo = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, status } = req.body;

    // Find the task in the database
    const task = await Todo.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update the task details and save the task
    task.title = title;
    task.description = description;
    task.status = status;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//update ststus
// const updateTodostatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     // Find the task in the database and update the status
//     const updatedTodo = await Todo.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     );

//     if (!updatedTodo) {
//       return res.status(404).json({ message: "Task not found" });
//     }

//     res.json(updatedTodo);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error updating todo item", error: err.message });
//   }
// };



// Delete a todo item
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.sendStatus(204);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting todo item", error: err.message });
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
}
