// routes/orderRoutes.js
const express = require('express');
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const router = express.Router();

// Add a menu item to the cart (order)
router.get('/create-order',async(req,res)=>{
    try{
        const order=await Order.create(req.body)
        if(!order) res.status(400).json({message:"Cannot Create"})
        res.status(200).json({message:"created"})
    }catch(e){
        res.status(400).json({message:"error happened !"})
    }
})
router.post('/add-to-cart', async (req, res) => {
    const { clientId, menuItemId, quantity } = req.body;

    try {
        const menuItem = await MenuItem.findById(menuItemId);
        if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });

        // Find or create an order for the client
        let order = await Order.findOne({ clientId, status: 'pending' });
        if (!order) {
            order = new Order({
                clientId,
                status: 'pending',
                items: [],
            });
        }

        // Add the item to the order
        order.items.push({
            menuItemId,
            quantity,
            price: menuItem.price * quantity, // Assuming the item has a price field
        });

        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    router.delete('/remove-from-cart', async (req, res) => {
        const { orderId, menuItemId } = req.body;
    
        try {
            const order = await Order.findById(orderId);
            if (!order) return res.status(404).json({ message: 'Order not found' });
    
            // Remove the item from the order
            order.items = order.items.filter(item => item.menuItemId.toString() !== menuItemId);
    
            await order.save();
            res.status(200).json(order);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
});
});
module.exports = router;
