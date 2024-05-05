const express = require('express');
const router = express.Router();
const categoryController = require('./../controllers/categoryController');
const { protect } = require('../controllers/auth/authController');

router.get('/',protect, categoryController.getAllCategories);
router.post('/',protect, categoryController.addCategory);
router.put('/:id',protect, categoryController.updateCategory); 
router.delete('/:id',protect, categoryController.deleteCategory);

module.exports = router;
