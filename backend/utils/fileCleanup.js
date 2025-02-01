// utils/fileCleanup.js
const fs = require('fs');
const path = require('path');

const cleanupUploadedFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`🗑️ Temporary file cleaned up: ${path.basename(filePath)}`);
      return true;
    }
    console.warn('⚠️ File does not exist:', filePath);
    return false;
  } catch (error) {
    console.error('❌ File cleanup failed:', error.message);
    return false;
  }
};

module.exports = { cleanupUploadedFile };