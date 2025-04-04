// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    paymentId: { type: Number, required: true },
    orderId: { type: Number, required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    paymentDate: { type: Date, required: true },
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
