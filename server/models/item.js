const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    department: { type: String, required: true },
    year: { type: String, required: true },
    itemName: { type: String, required: true },
    description: String,
    location: { type: String, required: true },
    time: String,
    contactNumber: { type: String, required: true },
    type: { type: String, enum: ['lost', 'found'], required: true },
    createdAt: { type: Date, default: Date.now },
    // Notifications store panna indha extra field
    messages: [{
        senderName: String,
        message: String,
        date: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model('Item', itemSchema);