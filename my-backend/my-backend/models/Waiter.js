// models/Waiter.js
const mongoose = require('mongoose');
const User = require('./User');

const waiterSchema = new mongoose.Schema({
    assignedSection: { type: String },
    currentOrders: { type: [String] },  // List of orders
    additionalInstructions: { type: String },
});

const Waiter = User.discriminator('Waiter', waiterSchema);
module.exports = Waiter;
