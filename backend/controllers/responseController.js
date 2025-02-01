const { db } = require('../config/firebase');
const logger = require('../utils/logger');

exports.getResponse = async (req, res) => {
  try {
    const documentId = req.params.documentId;
    const userId = req.headers['x-user-id'];

    // ... validation logic

    const userDocRef = db.collection('users').doc(userId);
    const uploadDoc = await userDocRef.collection('uploads').doc(documentId).get();

    // ... handle document existence check

    res.json({
      success: true,
      deepSeekResponse: uploadDoc.data().deepSeekResponse,
    });
    logger.info('✅ Fetched response for document:', documentId);
  } catch (error) {
    logger.error('❌ Error fetching response:', error);
    res.status(500).json({ error: 'Failed to fetch response', details: error.message });
  }
};