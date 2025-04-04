// models/Admin.js
const mongoose = require('mongoose');
const User = require('./User');

const adminSchema = new mongoose.Schema({
    adminId: { type: Number, required: true },
});

const Admin = User.discriminator('Admin', adminSchema);
module.exports = Admin;
