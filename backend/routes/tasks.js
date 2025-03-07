const router = require('express').Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

router.use(auth);


router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId }); 
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user.userId 
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId 
    });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;