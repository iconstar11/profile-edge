// routes/healthRoutes.js
const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

// Health check endpoint
router.get('/healthcheck', (req, res) => {
  res.json({
    status: "healthy",
    firestore: db ? "connected" : "disconnected",
    timestamp: new Date().toISOString()
  });
});

// Test Firestore write endpoint
router.post('/test-write', async (req, res) => {
  try {
    const docRef = db.collection("test-writes").doc();
    await docRef.set({
      testData: "This is a test record",
      timestamp: admin.firestore.FieldValue.serverTimestamp() // ❌ Remove "admin."
    });
    res.json({ success: true, docId: docRef.id });
  } catch (error) {
    console.error("Test write error:", error);
    res.status(500).json({ error: "Test write failed" });
  }
});

module.exports = router;