const mongoose = require('mongoose');

// Define the schema for the user data
const userSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    email: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    avatar: { type: String, required: true }
});

// Define the schema for the data object
const dataSchema = new mongoose.Schema({
    page: { type: Number, required: true },
    per_page: { type: Number, required: true },
    total: { type: Number, required: true },
    total_pages: { type: Number, required: true },
    data: [userSchema],  // Embed the user schema as an array
    support: {
        url: { type: String, required: true },
        text: { type: String, required: true }
    }
});

// Create a model using the schema
const UserData = mongoose.model('UserData', dataSchema);

// Export the model
module.exports = UserData;
