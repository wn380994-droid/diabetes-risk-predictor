const express = require('express');
const router = express.Router();
const {
  createPrediction,
  getAllPredictions,
  getPredictionById,
  deletePrediction,
  getAllPredictionsAdmin
} = require('../controllers/predictionController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', protect, createPrediction);
router.get('/', protect, getAllPredictions);
router.get('/admin/all', protect, adminOnly, getAllPredictionsAdmin); // ⭐ Admin
router.get('/:id', protect, getPredictionById);
router.delete('/:id', protect, deletePrediction);

module.exports = router;