const express = require("express");
const jwt = require("jsonwebtoken");
const Task = require("../models/Task");
const config = require("../config");

const router = express.Router();

// Middleware to verify token
const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// Create a new task
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    const task = new Task({
      userId: req.user.id,
      title,
      description,
      priority,
      dueDate,
    });
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get all tasks for the authenticated user
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update a task
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, description, priority, dueDate, completed } = req.body;
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (task.userId.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorized" });

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, priority, dueDate, completed },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete a task
router.delete("/:id", auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (task.userId.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorized" });

    await Task.findByIdAndRemove(req.params.id);
    res.json({ msg: "Task removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
