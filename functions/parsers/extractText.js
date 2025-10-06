import pdf from "pdf-parse";
import mammoth from "mammoth";
import fs from "fs";

/**
 * Extracts plain text from PDF or DOCX files.
 * @param {string} filePath - path to uploaded file
 * @param {string} mimeType - file MIME type
 * @returns {Promise<string>} Extracted text
 */
export async function extractText(filePath, mimeType) {
  try {
    if (mimeType === "application/pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdf(dataBuffer);
      return data.text;
    } else if (
      mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value;
    } else {
      throw new Error("Unsupported file type");
    }
  } catch (error) {
    console.error("❌ Error extracting text:", error);
    throw error;
  }
}
