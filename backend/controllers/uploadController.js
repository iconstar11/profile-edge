const { db } = require('../config/firebase');
const pdfExtractor = require('../extractors/pdfExtractor');
const wordExtractor = require('../extractors/wordExtractor');
const sendToDeepSeek = require('../sendToDeepSeek');
const fs = require('fs');
const path = require('path');
const { cleanupUploadedFile } = require('../utils/fileCleanup');
const logger = require('../utils/logger');

exports.handleUpload = async (req, res) => {
  try {
    const file = req.file;
    const userId = req.headers['x-user-id'];

    // ... (validation logic from original code)

    const filePath = file.path;
    const fileType = path.extname(file.originalname).toLowerCase();

    // Text extraction logic
    let extractedText;
    try {
      if (fileType === '.pdf') {
        extractedText = await pdfExtractor(filePath);
      } else if (fileType === '.docx') {
        extractedText = await wordExtractor(filePath);
      }
      console.log('✅ Successfully extracted text');
    } catch (extractionError) {
      // ... error handling
    }

    // ... file cleanup logic
    cleanupUploadedFile(filePath);

    // DeepSeek API call
    let deepSeekResponse;
    try {
      deepSeekResponse = await sendToDeepSeek(extractedText);
      logger.info('✅ DeepSeek response received');
    } catch (apiError) {
      // ... error handling
    }

    // Firestore write
    const userDocRef = db.collection('users').doc(userId);
    const uploadsCollectionRef = userDocRef.collection('uploads').doc();

    await uploadsCollectionRef.set({
      extractedText: extractedText.substring(0, 1000) + '...',
      deepSeekResponse,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      originalFilename: file.originalname,
    });

    // ... success response

  } catch (error) {
    logger.error('🚨 End-to-end error:', error);
    res.status(500).json({ error: 'Failed to process the file', details: error.message });
  }
};