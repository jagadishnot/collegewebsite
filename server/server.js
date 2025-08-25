const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/auth');
const collegeRoutes = require('./routes/college');
const ecommerceRoutes = require('./routes/ecommerce');

const app = express();
const PORT = process.env.PORT || 5000;

// ------------------- CORS -------------------
app.use(cors({
  origin: ['https://collegewebsite-4.onrender.com'], // Only your deployed frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ------------------- Middleware -------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // File uploads

// ------------------- API Routes -------------------
app.use('/api/auth', authRoutes);
app.use('/api/college', collegeRoutes);
app.use('/api/ecommerce', ecommerceRoutes);

// ------------------- React Frontend -------------------
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// ------------------- MongoDB Connection -------------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// ------------------- Global Error Handling -------------------
process.on('unhandledRejection', err => {
  console.error('❌ Unhandled Promise Rejection:', err.message);
  process.exit(1);
});
