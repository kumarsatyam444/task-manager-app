const Task = require('../models/Task');
const mongoose = require('mongoose');

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId }) 
      .sort({ createdAt: -1 });
    console.log('Sending tasks:', tasks);
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({
      title,
      description,
      user: req.user.userId 
    });
    console.log('Task created:', task);
    res.status(201).json(task);
  } catch (error) {
    console.error('Task creation error:', error);
    res.status(400).json({ error: error.message });
  }
};
  


const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such task' });
  }
  const task = await Task.findOneAndDelete({ _id: id });
  if (!task) {
    return res.status(400).json({ error: 'No such task' });
  }
  res.status(200).json(task);
};


const updateTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such task' });
  }
  const task = await Task.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!task) {
    return res.status(400).json({ error: 'No such task' });
  }
  res.status(200).json(task);
};

module.exports = {
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
  };
