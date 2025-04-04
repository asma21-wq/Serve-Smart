// models/Chef.js
const mongoose = require('mongoose');
const User = require('./User');  // Inherit from User

const chefSchema = new mongoose.Schema({
    specialty: { type: String },
    kitchenId: { type: Number },
});

const Chef = User.discriminator('Chef', chefSchema);
module.exports = Chef;
