const fs = require("fs");
const mammoth = require("mammoth");

const wordExtractor = async (filePath) => {
    try {
        // Read the Word document from the file path
        const dataBuffer = fs.readFileSync(filePath);

        // Extract text using mammoth
        const result = await mammoth.extractRawText({ buffer: dataBuffer });

        // Return the extracted text
        return result.value;
    } catch (error) {
        console.error("Error extracting text from Word document:", error);
        throw new Error("Failed to extract text from Word document");
    }
};

module.exports = wordExtractor;
