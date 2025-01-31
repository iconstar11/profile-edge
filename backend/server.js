// This is the Main backend server file (Node.js)

require('dotenv').config(); // Load environment variables FIRST
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors"); // Import CORS middleware
const pdfExtractor = require("./extractors/pdfExtractor");
const wordExtractor = require("./extractors/wordExtractor");
const sendToDeepSeek = require("./sendToDeepSeek");
const admin = require('./config'); // Firebase Admin initialization
const db = admin.firestore(); // Access Firestore
const auth = admin.auth(); // Access Auth

const app = express();
const port = process.env.PORT || 5000; // Use environment variable for port

// Enable CORS for all origins
app.use(cors());

// Configure Multer for file uploads
const upload = multer({
    dest: path.join(__dirname, "uploads"),
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

// Middleware to handle JSON responses
app.use(express.json());

// Route for file upload and text extraction
app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const filePath = file.path;
        const fileType = path.extname(file.originalname).toLowerCase();

        let extractedText;

        // Determine file type and process accordingly
        if (fileType === ".pdf") {
            extractedText = await pdfExtractor(filePath);
        } else if (fileType === ".docx") {
            extractedText = await wordExtractor(filePath);
        } else {
            return res.status(400).json({ error: "Unsupported file type" });
        }

        // Clean up the uploaded file after processing
        fs.unlinkSync(filePath);

        // Call DeepSeek API to process the extracted text
        const deepSeekResponse = await sendToDeepSeek(extractedText);

        console.log("DeepSeek Response:", deepSeekResponse);

        // Save the extracted text and DeepSeek response to Firestore
        const docRef = db.collection("uploads").doc(); // Create a new document
        await docRef.set({
            extractedText,
            deepSeekResponse,
            timestamp: admin.firestore.FieldValue.serverTimestamp(), // Add a timestamp
        });

        // Respond with the extracted text and Firestore document ID
        res.json({ text: extractedText, documentId: docRef.id });
    } catch (error) {
        console.error("Error processing file:", error);
        res.status(500).json({ error: "Failed to process the file", details: error.message });
    }
});

// Route to get user details (example of using Firebase Auth)
app.get("/user/:uid", async (req, res) => {
    try {
        const { uid } = req.params;

        // Fetch user details from Firebase Auth
        const userRecord = await auth.getUser(uid);

        // Respond with user details
        res.json({
            uid: userRecord.uid,
            email: userRecord.email,
            displayName: userRecord.displayName,
        });
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ error: "Failed to fetch user details", details: error.message });
    }
});

// Test Firestore route
app.get("/test-firestore", async (req, res) => {
    try {
        const docRef = db.collection("test").doc("123");
        await docRef.set({ message: "Firestore is working!" });

        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).json({ error: "Document not found" });
        }

        res.json(doc.data());
    } catch (error) {
        console.error("Firestore error:", error);
        res.status(500).json({ error: "Firestore operation failed", details: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log("DeepSeek API Key:", process.env.DEEPSEEK_API_KEY);
});