// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// ------------------- Import Routes -------------------
const authRoutes = require('./routes/auth');
const collegeRoutes = require('./routes/college');
const ecommerceRoutes = require('./routes/ecommerce');

// ------------------- App Setup -------------------
const app = express();
const PORT = process.env.PORT || 5000;

// ------------------- CORS Configuration -------------------
const corsOptions = {
  origin: ['http://localhost:3000', 'https://collegewebsite-4.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

// ------------------- Middleware -------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// ------------------- API Routes -------------------
app.use('/api/auth', authRoutes);
app.use('/api/college', collegeRoutes);
app.use('/api/ecommerce', ecommerceRoutes);

// ------------------- React Frontend Setup -------------------
if (process.env.NODE_ENV === 'production') {
  // Serve static files from React app
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Catch-all route to serve React frontend for any route not handled by APIs
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  // Default route for development
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// ------------------- MongoDB Connection -------------------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Stop server if DB connection fails
  });

// ------------------- Global Error Handling -------------------
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err.message);
  process.exit(1);
});
