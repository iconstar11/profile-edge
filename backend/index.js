// This is the Main backend server file (Node.js)
require('dotenv').config(); // Load environment variables FIRST
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const pdfExtractor = require("./extractors/pdfExtractor");
const wordExtractor = require("./extractors/wordExtractor");
const sendToDeepSeek = require("./sendToDeepSeek");
const admin = require('./config');
const db = admin.firestore();
const auth = admin.auth();

const app = express();
const port = process.env.PORT || 5000;

// Validate Firebase connection on startup
(async () => {
  try {
    console.log("🔥 Attempting Firebase connection...");
    await db.collection("test").doc("connection-test").set({ test: new Date() });
    console.log("✅ Successfully connected to Firestore");
  } catch (firebaseError) {
    console.error("❌ Firestore connection error:", firebaseError);
    process.exit(1); // Exit if Firebase connection fails
  }
})();

// Middleware setup
// Backend (Express) - Update CORS middleware
app.use(cors({
  origin: true, // Allow all origins
  exposedHeaders: ["X-User-Id"], // Expose custom header
}));
app.use(express.json());

// Enhanced Multer configuration
const upload = multer({
  dest: path.join(__dirname, "uploads"),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    allowedTypes.includes(ext) ? cb(null, true) : cb(new Error('Invalid file type'));
  }
});

// Enhanced upload route with detailed logging
app.post("/upload", upload.single("file"), async (req, res) => {
    console.log("Received UID:", req.headers["x-user-id"]);
  try {
    const file = req.file;
    const userId = req.headers["x-user-id"];  // Get the user's UID from the request

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const filePath = file.path;
    const fileType = path.extname(file.originalname).toLowerCase();

    let extractedText;
    if (fileType === ".pdf") {
      extractedText = await pdfExtractor(filePath);
    } else if (fileType === ".docx") {
      extractedText = await wordExtractor(filePath);
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    // Clean up the uploaded file
    fs.unlinkSync(filePath);

    // Call DeepSeek API
    const deepSeekResponse = await sendToDeepSeek(extractedText);

    // Save the data under the user's document
    const userDocRef = db.collection("users").doc(userId);
    const uploadsCollectionRef = userDocRef.collection("uploads").doc(); // Subcollection for uploads

    await uploadsCollectionRef.set({
      extractedText: extractedText.substring(0, 1000) + "...", // Store first 1000 chars
      deepSeekResponse,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      originalFilename: file.originalname,
    });

    console.log("💾 Firestore write successful for user:", userId);
    res.json({
      success: true,
      documentId: uploadsCollectionRef.id,
      preview: extractedText.substring(0, 200) + "...",
    });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: "Failed to process the file", details: error.message });
  }
});

// Enhanced test routes
app.get("/healthcheck", (req, res) => {
  res.json({
    status: "healthy",
    firestore: db ? "connected" : "disconnected",
    timestamp: new Date().toISOString()
  });
});

app.post("/test-write", async (req, res) => {
  try {
    const docRef = db.collection("test-writes").doc();
    await docRef.set({
      testData: "This is a test record",
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    res.json({ success: true, docId: docRef.id });
  } catch (error) {
    console.error("Test write error:", error);
    res.status(500).json({ error: "Test write failed" });
  }
});

// Existing routes remain unchanged...

// Server startup
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log("🔍 Debug modes:");
  console.log("- Test Firestore: GET /test-firestore");
  console.log("- Health check: GET /healthcheck");
  console.log("- Test write: POST /test-write");
});