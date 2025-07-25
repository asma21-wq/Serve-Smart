// models/MenuItem.js
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    MenuItemName: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;
