const Category = require("../models/categoryModel");


// Fetch all categories
// const getAllCategories = async (req, res) => {
//     try {
//         const categories = await Category.find();
//         res.json(categories);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.aggregate([
            {
                $lookup: {
                    from: 'events', // The name of the collection to join
                    localField: '_id', // Field from the input documents (Category)
                    foreignField: 'category', // Field from the documents of the "from" collection (Event)
                    as: 'events' // Output array field
                }
            },
            {
                $project: {
                    _id: 1, // Include the _id field
                    name: 1, // Include the name field
                    eventCount: { $size: '$events' } // Count the number of events in the events array
                }
            }
        ]);

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

// Update a category
const updateCategory = async (req, res) => {
    const categoryId = req.params.id;
    const updatedName = req.body.name.toLowerCase();
    try {
        // Check if the category exists
        const existingCategory = await Category.findById(categoryId);
        if (!existingCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Check if the updated name is the same as the existing name
        if (updatedName === existingCategory.name) {
            return res.status(400).json({ message: 'Category name is the same' });
        }

        // Check if the updated name already exists
        const duplicateCategory = await Category.findOne({ name: updatedName });
        if (duplicateCategory) {
            return res.status(400).json({ message: 'Category name already exists' });
        }

        // Update the category name
        existingCategory.name = updatedName;
        const updatedCategory = await existingCategory.save();

        res.json(updatedCategory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllCategories,
    addCategory,
    deleteCategory,
    updateCategory
};
