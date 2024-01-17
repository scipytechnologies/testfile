const express = require('express');
const router = express.Router();
const UserData = require('../models/User'); // Assuming the schema is in a file named 'userData.js'

// POST - Create a new user
router.post('/users', async (req, res) => {
    try {
        const newUser = new UserData(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET - Retrieve all users
router.get('/users', async (req, res) => {
    try {
        const users = await UserData.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET - Retrieve a specific user by ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await UserData.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT - Update a user by ID
router.put('/users/:id', async (req, res) => {
    try {
        // Attempt to find the user data based on the provided ID
        const existingData = await UserData.findById(req.params.id);

        // Check if a user with the specified ID was not found
        if (!existingData) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract the user data from the request body
        const newUser = req.body;

        // Push the new user data into the 'data' array
        existingData.data.push(newUser);

        // Save the updated document
        const updatedData = await existingData.save();

        // Respond with the updated user data
        res.status(200).json(updatedData);
    } catch (error) {
        // Handle any errors that occurred during the update process
        res.status(500).json({ message: error.message });
    }
});


// DELETE - Delete a user by ID
router.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await UserData.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
