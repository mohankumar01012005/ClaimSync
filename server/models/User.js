const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: 'patient' }  // Default role is 'patient'
});

module.exports = mongoose.model('User', userSchema);
