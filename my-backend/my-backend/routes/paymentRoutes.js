// routes/paymentRoutes.js
const express = require('express');
const Payment = require('../models/Payment');
const router = express.Router();

// Create a payment record
router.post('/payment', async (req, res) => {
    const { orderId, amount, paymentMethod } = req.body;
    
    const newPayment = new Payment({
        orderId,
        amount,
        paymentMethod,
        paymentDate: new Date(),
    });
    
    try {
        await newPayment.save();
        res.status(201).json(newPayment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
