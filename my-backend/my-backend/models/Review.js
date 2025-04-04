// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewId: { type: Number, required: true },
    clientId: { type: Number, required: true },
    reviewDescription: { type: String, required: true },
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
