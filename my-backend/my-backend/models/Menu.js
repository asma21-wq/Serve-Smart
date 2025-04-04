// models/Menu.js
const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    menuId: { type: Number, required: true },
});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
