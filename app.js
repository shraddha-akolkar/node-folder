require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user.route");
const todoRoutes = require("./routes/todo.route"); // ✅ ADD THIS LINE

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes); // ✅ ADD THIS LINE

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log("Server running on port", PORT);
// });

module.exports = app; // ✅ ADD THIS LINE