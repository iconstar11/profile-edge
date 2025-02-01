const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const uploadController = require('../controllers/uploadController');
const responseController = require('../controllers/responseController');

router.post('/upload', upload.single('file'), uploadController.handleUpload);
router.get('/get-response/:documentId', responseController.getResponse);

module.exports = router;