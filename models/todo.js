const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Todo", todoSchema);


// A model connects the Node.js code to MongoDB so you can:
// This file defines the shape / structure of the data in MongoDB.

// title → string, required

// description → optional

// createdAt → auto timestamp