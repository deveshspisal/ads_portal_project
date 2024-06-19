const express = require('express');
const { uploadAd, getAds, logClick, logImpression } = require('../controllers/adController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/upload', authMiddleware, uploadAd);
router.get('/ads', authMiddleware, getAds);
router.post('/click', logClick);
router.post('/impression', logImpression);
// router.get('/analytics', authMiddleware, getAnalytics);

module.exports = router
