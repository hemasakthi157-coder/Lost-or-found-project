const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    itemName: { type: String, required: true },
    senderName: { type: String, required: true }, 
    senderDept: { type: String },
    senderYear: { type: String },
    receiverName: { type: String, required: true }, // Porul-ah tholaichavanga (Owner)
    staffName: { type: String, required: true },
    staffDept: { type: String },
    staffContact: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);