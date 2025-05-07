// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/auth');
const collegeRoutes = require('./routes/college');
const ecommerceRoutes = require('./routes/ecommerce');

// App setup
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Optional: useful for form submissions

// Serve static files (uploads)
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/college', collegeRoutes);
app.use('/api/ecommerce', ecommerceRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    // Start the server after DB connects
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));


// Global error handler for unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err.message);
  process.exit(1);
});
