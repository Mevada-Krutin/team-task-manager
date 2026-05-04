const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Project = require('../models/Project');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/tasks/:projectId
// @desc    Get all tasks for a project
router.get('/:projectId', protect, async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId })
      .populate('assignedTo', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/tasks
// @desc    Create a new task
router.post('/', protect, async (req, res) => {
  const { title, description, dueDate, priority, project, assignedTo } = req.body;

  try {
    const projectObj = await Project.findById(project);
    if (!projectObj) return res.status(404).json({ message: 'Project not found' });

    // Check if user is admin of project
    if (projectObj.admin.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Only admin can create tasks' });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      project,
      assignedTo
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update task status or details
router.put('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const project = await Project.findById(task.project);
    const isAdmin = project.admin.toString() === req.user._id.toString();
    const isAssigned = task.assignedTo && task.assignedTo.toString() === req.user._id.toString();

    // If not admin and not assigned, check if at least a member
    if (!isAdmin && !isAssigned) {
      if (!project.members.includes(req.user._id)) {
        return res.status(401).json({ message: 'Not authorized' });
      }
      // If member but not assigned, they can't update
      return res.status(401).json({ message: 'You can only update tasks assigned to you' });
    }

    // If member (not admin), they can ONLY update status
    let updateData = req.body;
    if (!isAdmin) {
      updateData = { status: req.body.status };
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, updateData, { returnDocument: 'after' })
      .populate('assignedTo', 'name email');
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
router.delete('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const project = await Project.findById(task.project);
    // Only project admin can delete tasks
    if (project.admin.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Only admin can delete tasks' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
