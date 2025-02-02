const { db } = require('../config/firebase');
const logger = require('../utils/logger');

exports.getResponse = async (req, res) => {
  try {
    const documentId = req.params.documentId;
    const userId = req.headers['x-user-id'];

    // Validate documentId and userId
    if (!documentId) {
      logger.warn('⚠️ Document ID is required');
      return res.status(400).json({ error: 'Document ID is required' });
    }

    if (!userId) {
      logger.warn('⚠️ User ID is required');
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Log the request details
    logger.info(`Fetching response for document: ${documentId}, user: ${userId}`);

    // Fetch the document from Firestore
    const userDocRef = db.collection('users').doc(userId);
    const uploadDoc = await userDocRef.collection('uploads').doc(documentId).get();

    // Check if the document exists
    if (!uploadDoc.exists) {
      logger.warn(`⚠️ Document not found: ${documentId}`);
      return res.status(404).json({ error: 'Document not found' });
    }

    // Extract the DeepSeek response from the document
    const deepSeekResponse = uploadDoc.data().deepSeekResponse;

    // Log success and return the response
    logger.info(`✅ Fetched response for document: ${documentId}`);
    res.json({
      success: true,
      deepSeekResponse,
    });

  } catch (error) {
    // Log the error and return a 500 response
    logger.error('❌ Error fetching response:', error);
    res.status(500).json({ error: 'Failed to fetch response', details: error.message });
  }
};