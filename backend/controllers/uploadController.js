const { db, FieldValue } = require('../config/firebase');
const pdfExtractor = require('../extractors/pdfExtractor');
const wordExtractor = require('../extractors/wordExtractor');
const sendToDeepSeek = require('../sendToDeepSeek');
const fs = require('fs');
const path = require('path');
const { cleanupUploadedFile } = require('../utils/fileCleanup');
const logger = require('../utils/logger');

exports.handleUpload = async (req, res) => {
  try {
    const file = req.file; // Ensure this is being set by multer
    const userId = req.headers['x-user-id'];

    // Debugging: Log the file and userId
    logger.info('Received file:', file);
    logger.info('Received userId:', userId);

    // Validate file and userId
    if (!file) {
      logger.warn('⚠️ No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!userId) {
      logger.warn('⚠️ User ID is required');
      return res.status(400).json({ error: 'User ID is required' });
    }

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
      logger.info('✅ Successfully extracted text');
    } catch (extractionError) {
      logger.error('❌ Text extraction failed:', extractionError);
      cleanupUploadedFile(filePath); // Clean up the file
      return res.status(500).json({ error: 'Failed to extract text from the file' });
    }

    // Clean up the uploaded file
    cleanupUploadedFile(filePath);

    // DeepSeek API call
    let deepSeekResponse;
    try {
      deepSeekResponse = await sendToDeepSeek(extractedText);
      logger.info('✅ DeepSeek response received');
    } catch (apiError) {
      logger.error('❌ DeepSeek API error:', apiError);
      return res.status(500).json({ error: 'Failed to process the file with DeepSeek' });
    }

    // Firestore write
    const userDocRef = db.collection('users').doc(userId);
    const uploadsCollectionRef = userDocRef.collection('uploads').doc();

    await uploadsCollectionRef.set({
      extractedText: extractedText.substring(0, 1000) + '...',
      deepSeekResponse,
      timestamp: FieldValue.serverTimestamp(), // Use the imported FieldValue
      originalFilename: file.originalname,
    });

    logger.info('💾 Firestore write successful for user:', userId);
    res.json({
      success: true,
      documentId: uploadsCollectionRef.id,
      preview: extractedText.substring(0, 200) + '...',
      deepSeekResponse,
    });

  } catch (error) {
    logger.error('🚨 End-to-end error:', error);
    res.status(500).json({ error: 'Failed to process the file', details: error.message });
  }
};