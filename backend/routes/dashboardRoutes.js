const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Project = require('../models/Project');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics for the user
router.get('/stats', protect, async (req, res) => {
  try {
    // Get projects the user is part of
    const projects = await Project.find({
      $or: [{ admin: req.user._id }, { members: req.user._id }]
    });

    const projectIds = projects.map(p => p._id);

    // Get all tasks related to these projects
    const tasks = await Task.find({ project: { $in: projectIds } });

    const tasksPerUser = {};
    const populatedTasks = await Task.find({ project: { $in: projectIds } }).populate('assignedTo', 'name');
    
    populatedTasks.forEach(t => {
      if (t.assignedTo) {
        const name = t.assignedTo.name;
        tasksPerUser[name] = (tasksPerUser[name] || 0) + 1;
      } else {
        tasksPerUser['Unassigned'] = (tasksPerUser['Unassigned'] || 0) + 1;
      }
    });

    const stats = {
      totalTasks: tasks.length,
      todo: tasks.filter(t => t.status === 'To Do').length,
      inProgress: tasks.filter(t => t.status === 'In Progress').length,
      done: tasks.filter(t => t.status === 'Done').length,
      overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'Done').length,
      assignedToMe: tasks.filter(t => t.assignedTo && t.assignedTo.toString() === req.user._id.toString()).length,
      tasksPerUser
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
