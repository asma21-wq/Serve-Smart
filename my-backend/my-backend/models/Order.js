// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: { type: Number, required: true },
    clientId: { type: Number, required: true },
    waiterId: { type: Number, required: false },
    kitchenId: { type: Number,required: false },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
    item:String,
    paymentStatus: { type: Boolean, required: true },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
