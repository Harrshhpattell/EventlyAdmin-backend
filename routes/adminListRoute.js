const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect } = require('../controllers/auth/authController');
const { checkMasterAdmin } = require('../middleware/checkMasterAdmin');

// Route to fetch all admins
router.get('/',protect, adminController.getAllAdmins);
router.put('/:id/toggle-status',protect, checkMasterAdmin, adminController.toggleAdminStatus);
router.delete('/:id',protect,checkMasterAdmin, adminController.deleteAdminById);

module.exports = router;
