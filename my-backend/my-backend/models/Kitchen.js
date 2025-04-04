// models/Kitchen.js
const mongoose = require('mongoose');

const kitchenSchema = new mongoose.Schema({
    kitchenId: { type: Number, required: true },
});

const Kitchen = mongoose.model('Kitchen', kitchenSchema);
module.exports = Kitchen;
