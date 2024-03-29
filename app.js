const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./controller/userController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://qwe:qwe12@cluster0.g9mln6v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
    });

// Use the userRoutes for all routes starting with /api
app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
