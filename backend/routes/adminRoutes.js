const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  updateUserRole,
  getDashboardStats,
  getAllChats
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Admin အားလုံး protect + adminOnly လိုတယ်
router.use(protect);
router.use(adminOnly);

router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/role', updateUserRole);
router.get('/chats', getAllChats);

module.exports = router;