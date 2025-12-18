const Todo = require("../models/todo");

// ADD TODO
exports.addTodo = async (req, res) => {
  try {
    const newTodo = new Todo({
      title: req.body.title,
      description: req.body.description,
      userId: req.user._id
    });

    await newTodo.save();
    res.status(201).json({ message: "Todo added successfully" });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

// GET ALL TODOS (USER-WISE)
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
   return res.status(200).json(todos);
  } catch (error) {
   return res.status(400).json({ message: "Something went wrong" });
  }
};

// GET SINGLE TODO
exports.gettTodos = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(todo);
  } catch (error) {
   return res.status(400).json({ message: "Something went wrong" });
  }
};

// UPDATE TODO
exports.updateTodo = async (req, res) => {
  try {
    const result = await Todo.updateOne(
      { _id: req.params.id, userId: req.user._id },
      { $set: req.body }
    );

    res.status(200).json({ message: "Todo updated", result });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

// DELETE TODO
exports.deleteTodo = async (req, res) => {
  try {
    const result = await Todo.deleteOne({
  _id: req.params.id
});
    res.status(200).json({ message: "Todo deleted", result });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};



