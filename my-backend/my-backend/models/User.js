// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: Number, required: false },
    userName: { type: String, required: false },
    email: { type: String, required: false },
    phoneNumber: { type: String, required: false },
});

const User = mongoose.model('User', userSchema);
module.exports = User;

