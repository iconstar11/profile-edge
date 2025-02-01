require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { db } = require('./config/firebase');
const uploadRoutes = require('./routes/uploadRoutes');
const healthRoutes = require('./routes/healthRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: true,
  exposedHeaders: ['X-User-Id']
}));
app.use(express.json());

// Routes
app.use('/api', uploadRoutes);
app.use('/health', healthRoutes);

// Firebase connection test
const testFirestoreConnection = async () => {
  try {
    // Use the initialized Firestore instance
    await db.collection('test').doc('connection-test').set({ test: new Date() });
    console.log('✅ Firestore connection verified');
  } catch (error) {
    console.error('❌ Firestore connection failed:', error);
    process.exit(1);
  }
};

module.exports = { app, testFirestoreConnection };