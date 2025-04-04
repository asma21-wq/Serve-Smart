// models/Client.js
const mongoose = require('mongoose');
const User = require('./User');

const clientSchema = new mongoose.Schema({
    Clientname: { type: string, required: true },
    tableNumber: { type: Number, required: true }
});

const Client = User.discriminator('Client', clientSchema);
module.exports = Client;
