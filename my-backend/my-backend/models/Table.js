// models/Table.js
const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    tableNumber: { type: Number, required: true },
    tableStatus: { type: String, required: true },  // e.g., "Occupied", "Available"
});

const Table = mongoose.model('Table', tableSchema);
module.exports = Table;
