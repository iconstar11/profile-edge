import fs from "fs";
import os from "os";
import path from "path";

/**
 * Saves a file buffer to temporary storage and returns the path.
 */
export function saveTempFile(file) {
  const tempFilePath = path.join(os.tmpdir(), file.filename);
  fs.writeFileSync(tempFilePath, file.buffer);
  return tempFilePath;
}

/**
 * Deletes temporary file.
 */
export function deleteTempFile(filePath) {
  try {
    fs.unlinkSync(filePath);
  } catch (err) {
    console.warn("⚠️ Failed to delete temp file:", err);
  }
}
