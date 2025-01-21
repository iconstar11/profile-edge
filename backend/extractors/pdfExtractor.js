const fs = require("fs");
const pdfParse = require("pdf-parse");

const pdfExtractor = async (filePath) => {
    try {
        // Read the PDF file from the given file path
        const dataBuffer = fs.readFileSync(filePath);

        // Extract text using pdf-parse
        const pdfData = await pdfParse(dataBuffer);

        // Return the extracted text
        return pdfData.text;
    } catch (error) {
        console.error("Error extracting text from PDF:", error);
        throw new Error("Failed to extract text from PDF");
    }
};

module.exports = pdfExtractor;
