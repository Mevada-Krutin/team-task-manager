const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   GET /api/projects
// @desc    Get all projects for the logged in user
router.get('/', protect, async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { admin: req.user._id },
        { members: req.user._id }
      ]
    }).populate('admin', 'name email').populate('members', 'name email');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/projects
// @desc    Create a new project
router.post('/', protect, admin, async (req, res) => {
  const { title, description } = req.body;

  try {
    const project = await Project.create({
      title,
      description,
      admin: req.user._id,
      members: [req.user._id]
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/projects/:id/members
// @desc    Add member to project
router.put('/:id/members', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Only admin can add members
    if (project.admin.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { memberEmail } = req.body;
    const User = require('../models/User');
    const userToAdd = await User.findOne({ email: memberEmail });

    if (!userToAdd) return res.status(404).json({ message: 'User not found' });
    
    if (project.members.includes(userToAdd._id)) {
      return res.status(400).json({ message: 'User already a member' });
    }

    project.members.push(userToAdd._id);
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/projects/:id/members/:memberId
// @desc    Remove member from project
router.delete('/:id/members/:memberId', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Only admin can remove members
    if (project.admin.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Prevent removing admin themselves
    if (project.admin.toString() === req.params.memberId) {
      return res.status(400).json({ message: 'Cannot remove the project admin' });
    }

    project.members = project.members.filter(
      (m) => m.toString() !== req.params.memberId
    );
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
