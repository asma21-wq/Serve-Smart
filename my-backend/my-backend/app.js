require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');

// Import routes
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Initialize app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes);        // Authentication routes (sign in)
app.use('/api/payments', paymentRoutes); // Payment routes
app.use('/api/reviews', reviewRoutes);   // Review routes
app.use('/api/orders', orderRoutes);     // Order (cart) routes

// Default route
app.get('/', (req, res) => {
  res.send('Serve Smart!');
}); 

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
