// This is the Main backend server file (Node.js)

const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors"); // Import CORS middleware
const pdfExtractor = require("./extractors/pdfExtractor");
const wordExtractor = require("./extractors/wordExtractor");

const app = express();
const port = 5000;

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

        // Respond with the extracted text
        res.json({ text: extractedText });
    } catch (error) {
        console.error("Error processing file:", error);
        res.status(500).json({ error: "Failed to process the file" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
