// routes/reviewRoutes.js
const express = require('express');
const Review = require('../models/Review');
const router = express.Router();

// Add a review for a client or item
router.post('/review', async (req, res) => {
    const { clientId, menuItemId, reviewDescription } = req.body;

    const newReview = new Review({
        clientId,
        menuItemId,
        reviewDescription,
    });
    
    try {
        await newReview.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
