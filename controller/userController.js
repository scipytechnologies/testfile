const express = require("express");
const router = express.Router();
const UserData = require("../models/User"); // Assuming the schema is in a file named 'userData.js'

// POST - Create a new user
router.post("/users", async (req, res) => {
  try {
    const newUser = new UserData(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET - Retrieve all users
router.get("/users", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 6;
  const skip = (page - 1) * limit;

  try {
    const totalUsers = await UserData.countDocuments();
    const users = await UserData.find().skip(skip).limit(limit);
    res
      .status(200)
      .json({
        page: page,
        per_page: limit,
        total: totalUsers,
        total_pages: Math.ceil(totalUsers / limit),
        data: users,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Retrieve a specific user by ID
router.get("/users/:id", async (req, res) => {
  try {
    const user = await UserData.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;

  try {
    const user = await UserData.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE - Delete a user by ID
router.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await UserData.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
