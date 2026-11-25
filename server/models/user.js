const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Register Number
    password: { type: String, required: true },               // Secret Password
    name: { type: String, required: true },
    dept: { type: String, default: "IT" },
    isAdmin: { type: Boolean, default: false }                // Ungalukku 'true' nu vaikalam
});

module.exports = mongoose.model('User', UserSchema);