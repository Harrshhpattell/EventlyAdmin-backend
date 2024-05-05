const Category = require("../models/categoryModel");


// Fetch all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a new category
const addCategory = async (req, res) => {
    const categoryName = req.body.name.toLowerCase();
    try {
        // Check if the category already exists
        const existingCategory = await Category.findOne({ name: categoryName });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        // Create a new category
        const category = new Category({
            name: categoryName
        });

        // Save the new category
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Delete a category
const deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: 'Category deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllCategories,
    addCategory,
    deleteCategory
};
